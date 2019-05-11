import { Node } from '../types/Node.models';
import { Tag } from '../types/Tag.models';

export const hasTag = (node: Node, tag: Tag): boolean => node.tags && node.tags.indexOf(tag) !== -1;

export const filterNoRoot = (node: Node): boolean => node.path !== '/';

export const filterHasTag = (tag: string) => (node: Node): boolean => hasTag(node, tag);

export const sortCreated = (p1: Node, p2: Node): number => {
  return p2.created.getTime() - p1.created.getTime();
};
