import { Node } from '../../Shared/types/Node.models';

export interface TagNode extends Node {
  type: 'tag';
  name: string;
  count: number;
}
