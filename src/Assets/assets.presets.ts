import { Asset, AssetFilter, AssetPreset, AssetProfile } from '../Shared/types/Asset.models';

import { newProfile } from '../Shared/lib/assets/profiles';
import { imageBase64 } from '../Shared/lib/assets/profiles/image.base64';
import { imageResize } from '../Shared/lib/assets/profiles/image.resize';

interface ProfileIndex {
  [name: string]: AssetProfile;
}

const profileBuilder = (): ProfileIndex => {
  const profiles = [
    newProfile('image.blurup', imageBase64({ width: 20 })),
    newProfile('image.small', imageResize({ width: 400 })),
    newProfile('image.medium', imageResize({ width: 850 })),
    newProfile('image.large', imageResize({ width: 1400 })),
    newProfile('image.huge', imageResize({ width: 2600 }))
  ];

  const index: ProfileIndex = {};
  profiles.forEach(profile => (index[profile.name] = profile));
  return index;
};

const assetPreset = (name: string, filter: AssetFilter, profiles: AssetProfile[]): AssetPreset => {
  return {
    name,
    filter,
    profiles
  };
};

const localImages: AssetFilter = (asset: Asset) => {
  return asset.type === 'image' && asset.url.startsWith('.');
};

export const createAssetPresets = (): AssetPreset[] => {
  const profiles = profileBuilder();

  const imageDefault = assetPreset('image:default', localImages, [
    profiles['image.blurup'],
    profiles['image.small'],
    profiles['image.medium'],
    profiles['image.large']
  ]);

  const imageHero = assetPreset('image:hero', localImages, [
    profiles['image.blurup'],
    profiles['image.medium'],
    profiles['image.large'],
    profiles['image.huge']
  ]);

  const imagePhoto = assetPreset('image:photo', localImages, [profiles.original]);

  return [imageDefault, imageHero, imagePhoto];
};
