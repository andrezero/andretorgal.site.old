import { collect, dedupe, transform } from '../Shared/lib/assets';
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

export const loadAssets = (stage: string, nodes: Node[]): Asset[] => {
  const commonProfiles = ['image:default'];

  const rawAssets = collect(nodes, commonProfiles, assetExtractor);
  const assets = dedupe(rawAssets);

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
