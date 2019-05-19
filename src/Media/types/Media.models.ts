import { Asset, AssetSrc } from '../../Shared/types/Asset.models';
import { Node, NodeMeta } from '../../Shared/types/Node.models';

export interface ImageAssetSrc extends AssetSrc {
  width: number;
  height: number;
  ratio: number;
}

export interface MediaNode extends Node {
  type: 'media';
  url: string;
  meta: NodeMeta & {
    asset: Asset;
  };
}
