import * as React from 'react';

import { ImageAssetSrc } from '../../../Media/types/Media.models';
import { findAssetInNodeAssets, findAssetSrc } from '../../lib/assets';
import { Node } from '../../types/Node.models';
import { ResponsiveImg, ResponsiveSrc } from '../ResponsiveImg/ResponsiveImg.component';

import './NodeImg.scss';
import { AssetCaption } from '../AssetCaption/AssetCaption.component';

interface Props {
  node: Node;
  src: string;
  profiles?: string[];
  blurup?: boolean;
  pad?: boolean;
  className?: string;
}

const isLocal = (src: string) => src.startsWith('.');

export const NodeImg: React.StatelessComponent<Props> = ({
  node,
  src,
  profiles = [],
  blurup = true,
  pad = true,
  className
}) => {
  const cssClasses = ['node-image'];
  if (className) {
    cssClasses.push(className);
  }
  if (isLocal(src)) {
    const { assets } = node.meta;
    const asset = findAssetInNodeAssets(assets, src);
    const background = blurup && findAssetSrc(asset, 'image.blurup').href;
    const srcs: ImageAssetSrc[] = profiles.map(profile => findAssetSrc(asset, profile) as ImageAssetSrc);
    const ratio = pad && srcs.length && srcs[0].ratio;
    const img: ResponsiveSrc = {
      set: srcs.map(s => [`${s.width}w`, s.href]),
      sizes: ['90vw']
    };
    const { title, author, license } = asset;
    const hasCaption = title || author || license;
    return (
      <figure className="node-img">
        <ResponsiveImg className={cssClasses.join(' ')} src={img} bg={background} ratio={ratio} />
        {hasCaption && <AssetCaption asset={asset} />}
      </figure>
    );
  } else {
    return <ResponsiveImg className={cssClasses.join(' ')} src={src} />;
  }
};
