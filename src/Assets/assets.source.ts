import { collect, dedupe, transform } from '../Shared/lib/assets';
import {
  Asset,
  AssetExtractor,
  AssetLocator,
  AssetPreset,
  AssetSourceNode,
  ExtractedAsset
} from '../Shared/types/Asset.models';
import { Node, NodeIndex } from '../Shared/types/Node.models';

const assetExtractor: AssetExtractor = (node: Node): ExtractedAsset[] => {
  const assets: ExtractedAsset[] = [];
  const { hero } = node.features;
  if (hero) {
    assets.push({
      type: 'image',
      title: `${node.title} banner image`,
      url: `${hero.img}#image:hero`
    });
  }
  return assets;
};

export const loadAssets = (nodes: Node[]): Asset[] => {
  const commonProfiles = ['image:default'];

  const rawAssets = collect(nodes, commonProfiles, assetExtractor);
  const assets = dedupe(rawAssets);

  return assets;
};

export const processAssets = async (assets: Asset[], locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  await transform(assets, locator, presets);
};

export const attachAssets = (assets: Asset[], nodes: Node[]) => {
  const nodeIndex: NodeIndex = {};

  nodes.forEach(node => (nodeIndex[node.path] = node));

  assets.forEach(asset => {
    asset.sources.forEach(source => {
      if (source.type === 'node') {
        const path = (source as AssetSourceNode).node.link.path;
        nodeIndex[path].meta.assets.push(asset);
      }
    });
  });
};
