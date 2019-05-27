import 'intersection-observer';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export type SrcSetItem = [string, string];

export type SrcSet = SrcSetItem[];

export interface ResponsiveSrc {
  set: SrcSet;
  sizes: string[];
}

interface Props {
  src: ResponsiveSrc | string;
  bg?: string;
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
}

import './ResponsiveImg.scss';

const makeSrc = (src: ResponsiveSrc | string): { defaultSrc: string; srcSet?: string; sizes?: string } => {
  if (typeof src !== 'string') {
    return {
      defaultSrc: src.set[src.set.length - 1][1],
      srcSet: src.set.map(item => `${item[1]} ${item[0]}`).join(', '),
      sizes: src.sizes.join(', ')
    };
  }
  return {
    defaultSrc: src
  };
};

const makePictureStyle = (bg: string): React.CSSProperties => {
  const style: React.CSSProperties = {};
  if (bg) {
    style.backgroundImage = `url('${bg}')`;
    style.backgroundSize = `cover`;
  }
  return style;
};

const makeImageStyle = (ratio: number, style: React.CSSProperties) => {
  const imgStyle: React.CSSProperties = {};
  if (ratio) {
    style.paddingBottom = Math.round((1 / ratio) * 100) + '%';
    style.position = 'relative';
    imgStyle.position = 'absolute';
  }
  return imgStyle;
};

export const ResponsiveImg: React.StatelessComponent<Props> = ({ src, ratio, bg, className, children }) => {
  const { defaultSrc, srcSet, sizes } = makeSrc(src);
  const style: React.CSSProperties = makePictureStyle(bg);
  const imgStyle: React.CSSProperties = makeImageStyle(ratio, style);
  const handleImageLoaded = (ev: React.SyntheticEvent) => {
    const picture = (ev.target as any).parentElement;
    if (picture) {
      picture.classList.add('is-loaded');
    }
  };
  const [ref, inView] = useInView({
    threshold: 0
  });
  return (
    <picture ref={ref} className={`r-img ${className}`} style={style}>
      {inView && (
        <>
          {children}
          <img sizes={sizes} srcSet={srcSet} src={defaultSrc} style={imgStyle} onLoad={handleImageLoaded} />
        </>
      )}
    </picture>
  );
};
