import * as React from 'react';

export type SrcSetItem = [string, string];

export type SrcSet = SrcSetItem[];

export interface ResponsiveSrc {
  set: SrcSet;
  sizes: string[];
}

interface Props {
  src: ResponsiveSrc;
  bg?: string;
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
}

import './ResponsiveImg.scss';

export const ResponsiveImg: React.StatelessComponent<Props> = ({ src, ratio, bg, className, children }) => {
  const defaultSrc = src.set[src.set.length - 1][1];
  const srcSet = src.set.map(item => `${item[1]} ${item[0]}`).join(', ');
  const sizes = src.sizes.join(', ');
  const style: React.CSSProperties = {};
  const imgStyle: React.CSSProperties = {};
  if (bg) {
    style.backgroundImage = `url('${bg}')`;
    style.backgroundSize = `cover`;
  }
  if (ratio) {
    style.paddingBottom = Math.round((1 / ratio) * 100) + '%';
    style.position = 'relative';
    imgStyle.position = 'absolute';
  }
  const handleImageLoaded = () => {
    // console.log('loaded'!);
  };
  return (
    <picture className={`fluid ${className}`} style={style}>
      <img sizes={sizes} srcSet={srcSet} src={defaultSrc} style={imgStyle} onLoad={handleImageLoaded} />
    </picture>
  );
};
