import * as React from 'react';

export type SrcSetItem = [string, string];

export type SrcSet = SrcSetItem[];

export interface ResponsiveSrc {
  set: SrcSet;
  sizes: string[];
}

interface Props {
  src: string;
}

export const AssetImg: React.StatelessComponent<Props> = props => {
  console.log(props);
  return <img src="src" />;
  // const defaultSrc = src.set[src.set.length - 1][1];
  // const srcSet = src.set.map(item => `${item[1]} ${item[0]}`).join(', ');
  // const sizes = src.sizes.join(', ');
  // const className = 'asset-image';
  // return (
  //   <picture className={className}>
  //     <img sizes={sizes} srcSet={srcSet} src={defaultSrc} />
  //   </picture>
  // );
};
