import { format as formatUrl, parse as parseUrl } from 'url';

import { linkToNode } from '../links';
import { findImages } from '../markdown';

import {
  Asset,
  AssetExtractor,
  AssetLocator,
  AssetPipelines,
  AssetPreset,
  AssetProfile,
  AssetSource,
  AssetSourceNode,
  AssetSrc
} from '../../types/Asset.models';
import { Node } from '../../types/Node.models';

type ParsedUrl = ReturnType<typeof parseUrl>;

const extractPresets = (url: ParsedUrl): string[] => {
  if (!url.hash) {
    return [];
  }
  return url.hash.substring(1).split('+');
};

const findAssetsInNode = (node: Node, presets: string[] = [], assetExtractor?: AssetExtractor): Asset[] => {
  const assets = findImages(node.content) as Asset[];
  if (assetExtractor) {
    assets.push(...assetExtractor(node));
  }
  const allAssets = assets.map((asset: any) => {
    const parsedUrl = parseUrl(asset.url);
    const urlPresets = extractPresets(parsedUrl);
    const assetSource: AssetSourceNode = {
      type: 'node',
      node: {
        source: node.meta.source,
        link: linkToNode(node)
      }
    };
    const { type, title, alt, author, license, url } = asset;
    return {
      sources: [assetSource],
      type,
      title: title || alt,
      alt: alt || title,
      url: formatUrl({ ...parsedUrl, hash: null }),
      author,
      license,
      originalUrl: url,
      presets: [...presets, ...urlPresets],
      profiles: {}
    };
  });
  return allAssets;
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
    let id;
    if (source.type === 'node') {
      id = (source as AssetSourceNode).node.source.ref;
    }
    if (id) {
      return index.hasOwnProperty(id) ? false : (index[id] = true);
    }
    return true;
  });
};

const dedupePresetsAndSources = (asset: Asset): Asset => ({
  ...asset,
  presets: dedupeAssetPresets(asset.presets),
  sources: dedupeAssetSources(asset.sources)
});

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
  const profiles = asset.presets.reduce((acc, presetName) => {
    return acc.concat(presetProfiles(asset, presetName, presets));
  }, [] as AssetProfile[]);
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

const transformAsset = async (asset: Asset, locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  const profiles = assetProfiles(asset, presets);

  if (profiles.length) {
    await locator.locate(asset);
    await transformAssetProfiles(asset, locator, profiles);
  }
};

export const collect = (nodes: Node[], presets?: string[], assetExtractor?: AssetExtractor): Asset[] => {
  return nodes.reduce((acc, node) => acc.concat(findAssetsInNode(node, presets, assetExtractor)), [] as Asset[]);
};

export const dedupe = (assets: Asset[]): Asset[] => {
  return assets.filter(dedupAssets).map(dedupePresetsAndSources);
};

export const transform = async (assets: Asset[], locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  const promises = assets.map(async asset => {
    return transformAsset(asset, locator, presets);
  });

  await Promise.all(promises);
};

export const findAssetSrc = (asset: Asset, profile: string): AssetSrc => {
  const { profiles } = asset;
  if (!profiles[profile]) {
    throw new Error(`Unknown profile "${profile}" in asset "${asset.url}"`);
  }
  return asset.profiles[profile];
};

export const findAssetInNodeAssets = (assets: Asset[], url: string): Asset => {
  const asset = assets.find(a => a.url === url || a.originalUrl === url);
  if (!asset) {
    throw new Error(`Unknown asset url: "${url}"`);
  }
  return asset;
};
