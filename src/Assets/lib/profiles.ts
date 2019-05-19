import { AssetProcessor, AssetProfile } from '../../Shared/types/Asset.models';

export const newProfile = (name: string, process: AssetProcessor): AssetProfile => ({
  name,
  process
});
