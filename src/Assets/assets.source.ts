import { collect, dedupe, transform } from '../Shared/lib/assets';
import { Asset, AssetLocator, AssetPreset } from '../Shared/types/Asset.models';
import { Node } from '../Shared/types/Node.models';

export const loadAssets = (nodes: Node[]): Asset[] => {
  const commonProfiles = ['image:default'];

  const rawAssets = collect(nodes, commonProfiles);
  const assets = dedupe(rawAssets);

  return assets;
};

export const processAssets = async (assets: Asset[], locator: AssetLocator, presets: AssetPreset[]): Promise<void> => {
  await transform(assets, locator, presets);
};
