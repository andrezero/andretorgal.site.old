import * as React from 'react';

export type SrcSetItem = [string, string];

export type SrcSet = SrcSetItem[];

export interface ResponsiveSrc {
  set: SrcSet;
  sizes: string[];
}

interface Props {
  className?: string;
  src: ResponsiveSrc;
}

export const ResponsiveImg: React.StatelessComponent<Props> = ({ className, src }) => {
  const defaultSrc = src.set[src.set.length - 1][1];
  const srcSet = src.set.map(item => `${item[1]} ${item[0]}`).join(', ');
  const sizes = src.sizes.join(', ');
  return (
    <picture className={className}>
      <img sizes={sizes} srcSet={srcSet} src={defaultSrc} />
    </picture>
  );
};
