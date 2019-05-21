import { AssetProcessor, AssetProfile } from '../../types/Asset.models';

export const newProfile = (name: string, process: AssetProcessor): AssetProfile => ({
  name,
  process
});
