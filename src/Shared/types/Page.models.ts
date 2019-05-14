import { SrcSet } from '../elements/ResponsiveImg/ResponsiveImg.component';
import { Node } from './Node.models';

export interface PageNode extends Node {
  type: 'page';
  hero?: {
    img?: string | SrcSet;
    title?: string;
    text?: string;
  };
}

export interface ErrorPageNode extends PageNode {
  type: 'page';
  error: string;
}
