import { format as formatUrl, parse as parseUrl } from 'url';

import strip from 'remark-strip-html';
import { Attacher, Transformer } from 'unified';
import unified from 'unified';
import * as Unist from 'unist';
import visit from 'unist-util-visit';

import { parser as htmlParser } from './html';
import { linkToNode } from './links';
import { parser as markdownParser } from './markdown';

import { Asset, AssetLocator, AssetPipelines, AssetPreset, AssetProfile, AssetSource } from '../types/Asset.models';
import { Node } from '../types/Node.models';

type ParsedUrl = ReturnType<typeof parseUrl>;

const extractPresets = (url: ParsedUrl): string[] => {
  if (!url.hash) {
    return [];
  }
  return url.hash.substring(1).split('+');
};

const processHtmlTree: Attacher = () => {
  const transformer: Transformer = (tree: Unist.Node): Unist.Node => {
    const images: any[] = [];

    visit(tree, 'element', (node: any) => {
      const { href, alt, title } = node.properties;
      if (node.tagName !== 'img' || !href) {
        return;
      }
      const image = {
        type: 'image',
        url: href,
        alt,
        title
      };
      images.push(image);
    });

    const children = tree.children as any[];
    children.splice(0);
    children.push(...images);

    return tree;
  };
  return transformer;
};

const findInHtml = (html: string): Unist.Node[] => {
  const tree = htmlParser()
    .use(strip)
    .parse(html);

  const processor = unified().use(processHtmlTree);
  const result = processor.runSync(tree).children;

  return result as Unist.Node[];
};

const processMarkdownTree: Attacher = () => {
  const transformer: Transformer = (tree: Unist.Node): Unist.Node => {
    const images: any[] = [];

    visit(tree, 'html', (node: any) => {
      const nodes = findInHtml(node.value);
      images.push(...nodes);
    });

    visit(tree, 'image', (node: any) => {
      images.push(node);
    });

    const children = tree.children as any[];
    children.splice(0);
    children.push(...images);

    return tree;
  };
  return transformer;
};

const findInMarkdown = (markdown: string): Unist.Node[] => {
  const tree = markdownParser()
    .use(strip)
    .parse(markdown);

  const processor = unified().use(processMarkdownTree);
  const result = processor.runSync(tree).children;

  return result as Unist.Node[];
};

const findAssetsInNode = (node: Node, presets: string[] = []): Asset[] => {
  const assets = findInMarkdown(node.content);
  return assets.map((asset: any) => {
    const url = parseUrl(asset.url);
    const urlPresets = extractPresets(url);
    const assetSource: AssetSource = {
      filename: node.meta.origin,
      node: linkToNode(node)
    };
    return {
      sources: [assetSource],
      type: asset.type,
      title: asset.title,
      alt: asset.alt,
      url: formatUrl({ ...url, hash: null }),
      originalUrl: asset.url,
      presets: [...presets, ...urlPresets],
      profiles: {}
    };
  });
};

const dedupAssets = (asset: Asset, index: number, assets: Asset[]): boolean => {
  const exists = assets.find((other, otherIx) => other.url === asset.url && index > otherIx);
  if (!exists) {
    return true;
  }
  if (exists) {
    exists.presets = exists.presets.concat(asset.presets);
    exists.sources = exists.sources.concat(asset.sources);
    return false;
  }
};

const dedupeAssetPresets = (presets: string[]) => presets.filter((item, pos) => presets.indexOf(item) === pos);

const dedupeAssetSources = (sources: AssetSource[]) => {
  const index = {};
  return sources.filter(source => {
    return index.hasOwnProperty(source.filename) ? false : (index[source.filename] = true);
  });
};

const dedupePresetsAndSources = (asset: Asset): Asset => ({
  ...asset,
  presets: dedupeAssetPresets(asset.presets),
  sources: dedupeAssetSources(asset.sources)
});

export const collect = (nodes: Node[], presets?: string[]): Asset[] => {
  return nodes.reduce((acc, node) => acc.concat(findAssetsInNode(node, presets)), [] as Asset[]);
};

export const dedupe = (assets: Asset[]): Asset[] => {
  return assets.filter(dedupAssets).map(dedupePresetsAndSources);
};

const findPreset = (presetName: string, presets: AssetPreset[]): AssetPreset => {
  const preset = presets.find(p => p.name === presetName);
  if (!preset) {
    throw new Error(`Unknown preset ${presetName}`);
  }
  return preset;
};

const presetProfiles = (asset: Asset, presetName: string, presets: AssetPreset[]): AssetProfile[] => {
  const preset = findPreset(presetName, presets);
  return preset.filter(asset) ? preset.profiles : [];
};

const dedupeProfiles = (profiles: AssetProfile[]) => profiles.filter((item, pos) => profiles.indexOf(item) === pos);

const assetProfiles = (asset: Asset, presets: AssetPreset[]): AssetProfile[] => {
  const profiles = asset.presets.reduce(
    (acc, presetName) => {
      return acc.concat(presetProfiles(asset, presetName, presets));
    },
    [] as AssetProfile[]
  );
  return dedupeProfiles(profiles);
};

const transformAssetProfiles = async (asset: Asset, locator: AssetLocator, profiles: AssetProfile[]): Promise<void> => {
  const pipelines: AssetPipelines = {};
  const promises = profiles.map(async profile => {
    const src = await profile.process(asset, pipelines, profile.name, locator);
    if (src) {
      asset.profiles[profile.name] = src;
    }
  });
  await Promise.all(promises);
};

export const transformAsset = async (asset: Asset, locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  const profiles = assetProfiles(asset, presets);

  if (profiles.length) {
    await locator.locate(asset);
    await transformAssetProfiles(asset, locator, profiles);
  }
};

export const transform = async (assets: Asset[], locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  const promises = assets.map(async asset => {
    return transformAsset(asset, locator, presets);
  });

  await Promise.all(promises);
};
