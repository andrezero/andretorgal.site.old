import { Asset, AssetFilter, AssetPreset, AssetProfile } from '../Shared/types/Asset.models';

import { newProfile } from './lib/profiles';
import { imageBase64 } from './profiles/image.base64';
import { imageResize } from './profiles/image.resize';

interface ProfileIndex {
  [name: string]: AssetProfile;
}

const profileBuilder = (): ProfileIndex => {
  const profiles = [
    newProfile('image.blurup', imageBase64({ width: 20, height: 20 })),
    newProfile('image.small', imageResize({ width: 400 })),
    newProfile('image.medium', imageResize({ width: 900 })),
    newProfile('image.large', imageResize({ width: 1400 }))
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

export const presetBuilder = (): AssetPreset[] => {
  const profiles = profileBuilder();

  const imageDefault = assetPreset('image:default', localImages, [
    profiles['image.blurup'],
    profiles['image.small'],
    profiles['image.medium'],
    profiles['image.large']
  ]);

  const imagePhoto = assetPreset('image:photo', localImages, [profiles.original]);

  return [imageDefault, imagePhoto];
};
