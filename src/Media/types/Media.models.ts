import { Asset, Node, NodeMeta } from '../../Shared/types/Node.models';

export interface ImageAsset extends Asset {
  res: { w: number; h: number };
}

export interface MediaNode extends Node {
  type: 'media';
  url: string;
  meta: NodeMeta & {
    asset: Asset;
  };
}
