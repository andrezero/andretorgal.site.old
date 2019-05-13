import { Node } from './Node.models';

export interface PageNode extends Node {
  type: 'page';
}

export interface ErrorPageNode extends PageNode {
  type: 'page';
  error: string;
}
