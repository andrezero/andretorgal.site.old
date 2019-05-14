import * as React from 'react';

export interface SrcSet {
  [key: number]: string;
}

interface Props {
  className?: string;
  src?: string | SrcSet;
}

export const ResponsiveImg: React.StatelessComponent<Props> = ({ className, src }) => {
  let srcSet = '';
  let imgSrc = '';
  if (typeof src === 'string') {
    imgSrc = src;
  } else {
    const keys = Object.keys(src);
    imgSrc = src[keys[0]];
    srcSet = keys.map(key => `${src[key]} ${key}`).join(', ');
  }
  return <img className={className} sizes="100vw" srcSet={srcSet} data-object-fit="cover" src={imgSrc} />;
};
