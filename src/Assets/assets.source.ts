import { collect, dedupe, transform } from '../Shared/lib/assets';
import { Asset, AssetLocator, AssetPreset } from '../Shared/types/Asset.models';
import { Node, NodeIndex } from '../Shared/types/Node.models';

export const loadAssets = (nodes: Node[]): Asset[] => {
  const commonProfiles = ['image:default'];

  const rawAssets = collect(nodes, commonProfiles);
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
    asset.sources.forEach(source => nodeIndex[source.node.path].meta.assets.push(asset));
  });
};
