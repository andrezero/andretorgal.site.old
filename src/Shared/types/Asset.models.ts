import { Node, NodeLink, NodeMeta } from './Node.models';

export interface Asset {
  sources: NodeLink[];
  type: string;
  title?: string;
  alt?: string;
  url: string;
  profiles: string[];
  src: {
    [profile: string]: any;
  };
}

export interface ImageAsset extends Asset {
  res: { w: number; h: number };
}

export interface AssetNode extends Node {
  type: 'asset';
  meta: NodeMeta & {
    asset: Asset;
  };
}
