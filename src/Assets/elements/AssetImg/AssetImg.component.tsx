import * as React from 'react';

import { ImageAssetSrc } from '../../../Media/types/Media.models';
import { ResponsiveImg, ResponsiveSrc } from '../../../Shared/elements/ResponsiveImg/ResponsiveImg.component';
import { Node } from '../../../Shared/types/Node.models';

interface Props {
  node: Node;
  src: string;
}

const findAssetProfile = (node: Node, url: string, profile: string) => {
  const asset = node.meta.assets.find(a => a.originalUrl === url);
  return asset.profiles[profile];
};

export const AssetImg: React.StatelessComponent<Props> = ({ node, src }) => {
  if (src.startsWith('.')) {
    const background = findAssetProfile(node, src, 'image.blurup').href;
    const small = findAssetProfile(node, src, 'image.small') as ImageAssetSrc;
    const medium = findAssetProfile(node, src, 'image.medium') as ImageAssetSrc;
    const large = findAssetProfile(node, src, 'image.large') as ImageAssetSrc;

    const img: ResponsiveSrc = {
      set: [[`${small.width}w`, small.href], [`${medium.width}w`, medium.href], [`${large.width}w`, large.href]],
      sizes: ['100vw']
    };

    return <ResponsiveImg className="asset-image" src={img} bg={background} ratio={small.ratio} />;
  } else {
    const img: ResponsiveSrc = {
      set: [[null, src]],
      sizes: ['100vw']
    };

    return <ResponsiveImg className="asset-image" src={img} />;
  }
};
