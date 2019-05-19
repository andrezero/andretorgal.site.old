import { Asset, AssetFilter, AssetPreset, AssetProfile } from '../Shared/types/Asset.models';

import { imageBase64 } from './lib/image.blurup';
import { imageResize } from './lib/image.resize';

interface ProfileIndex {
  [name: string]: AssetProfile;
}

const profileBuilder = (): ProfileIndex => {
  const profiles = [
    {
      name: 'image.blurup',
      process: imageBase64({ width: 20, height: 20 })
    },
    {
      name: 'image.small',
      process: imageResize({ width: 400 })
    },
    {
      name: 'image.medium',
      process: imageResize({ width: 800 })
    }
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
    profiles['image.medium']
  ]);

  const imagePhoto = assetPreset('image:photo', localImages, [profiles.original]);

  return [imageDefault, imagePhoto];
};
