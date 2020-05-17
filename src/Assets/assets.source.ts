import { extractAssetsFromNodes, dedupeAssets, transform } from '../Shared/lib/assets';
import { Asset, AssetExtractor, AssetLocator, AssetPreset, AssetSourceNode } from '../Shared/types/Asset.models';
import { Node, NodeIndex } from '../Shared/types/Node.models';

const assetExtractor: AssetExtractor = (node: Node): Asset[] => {
  const assets: Asset[] = [];
  const { hero } = node.features;
  if (hero) {
    const url = `${hero.img}#image:hero`;
    const title = `${node.title} banner image`;
    assets.push({
      sources: [],
      created: node.created,
      updated: node.updated,
      type: 'image',
      title,
      alt: title,
      url,
      originalUrl: url,
      presets: [],
      profiles: {}
    });
  }
  return assets;
};

export const generateAssetsFromNodes = (stage: string, nodes: Node[]): Asset[] => {
  const commonProfiles = ['image:default'];

  const rawAssets = extractAssetsFromNodes(nodes, commonProfiles, assetExtractor);
  const assets = dedupeAssets(rawAssets);

  return assets;
};

export const processAssets = async (
  stage: string,
  assets: Asset[],
  locator: AssetLocator,
  presets: AssetPreset[]
): Promise<void> => {
  await transform(assets, locator, presets);
};

export const attachAssets = (stage: string, assets: Asset[], nodes: Node[]) => {
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
