import { parse as parseUrl } from 'url';

import strip from 'remark-strip-html';
import { Attacher, Transformer } from 'unified';
import unified from 'unified';
import * as Unist from 'unist';
import visit from 'unist-util-visit';

import { parser as htmlParser } from './html';
import { dedupeLinks, linkToNode } from './links';
import { parser as markdownParser } from './markdown';
import { newNode } from './nodes';
import { slug } from './strings';

import { Asset, AssetNode } from '../types/Asset.models';
import { Node } from '../types/Node.models';

type ParsedUrl = ReturnType<typeof parseUrl>;

const extractProfiles = (url: ParsedUrl): string[] => {
  if (!url.hash) {
    return;
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

const findAssetsInNode = (node: Node): Asset[] => {
  const assets = findInMarkdown(node.content);
  return assets.map((asset: any) => {
    const url = parseUrl(asset.url);
    const profiles = extractProfiles(url);
    return {
      sources: [linkToNode(node)],
      type: asset.type,
      title: asset.title,
      alt: asset.alt,
      url: url.path,
      profiles,
      src: {}
    };
  });
};

const dedupAssets = (asset: Asset, index: number, assets: Asset[]): boolean => {
  const exists = assets.find((other, otherIx) => other.url === asset.url && index > otherIx);
  if (!exists) {
    return true;
  }
  if (exists) {
    exists.profiles = exists.profiles.concat(asset.profiles);
    exists.sources = exists.sources.concat(asset.sources);
    return false;
  }
};

const dedupeAssetProfiles = (profiles: string[]) => profiles.filter((item, pos) => profiles.indexOf(item) === pos);

const dedupeProfilesAndSources = (asset: Asset) => ({
  ...asset,
  profiles: dedupeAssetProfiles(asset.profiles),
  sources: dedupeLinks(asset.sources)
});

export const collectAssets = (nodes: Node[]): Asset[] => {
  return nodes
    .reduce((acc, node) => acc.concat(findAssetsInNode(node)), [] as Asset[])
    .filter(dedupAssets)
    .map(dedupeProfilesAndSources);
};

export const newAssetNode = (asset: Asset): AssetNode => {
  const defaults = {
    template: `Asset/${asset.type}`
  };
  const assetNode = newNode('asset', asset.title || slug(asset.url), defaults) as AssetNode;
  assetNode.abstract = asset.alt;

  return assetNode;
};
