import { resolve } from 'path';

import { Node, NodeLink, Tag } from '../types/Node.models';

export const linkToNode = (node: Node): NodeLink => {
  const { type, path, title } = node;
  return { type, path, title };
};

export const hasTag = (node: Node, tag: Tag): boolean => node.tags && node.tags.indexOf(tag) !== -1;

export const filterNoRoot = (node: Node): boolean => node.path !== '/';

export const filterHasTag = (tag: string) => (node: Node): boolean => hasTag(node, tag);

export const sortCreated = (p1: Node, p2: Node): number => {
  if (!p2.created) {
    return 1;
  }
  if (!p1.created) {
    return -1;
  }
  return p2.created.getTime() - p1.created.getTime();
};

export const sortUpdated = (p1: Node, p2: Node): number => {
  if (!p2.updated) {
    return 1;
  }
  if (!p1.updated) {
    return -1;
  }
  return p2.updated.getTime() - p1.updated.getTime();
};

export const linkHierarchy = <T extends Node>(nodes: T[]) => {
  nodes.forEach(parent => {
    parent.links = parent.links || {};
    parent.links.children = parent.links.children || [];
    nodes.forEach(child => {
      if (child === parent) {
        return;
      }
      const parentPath = child.path
        .split('/')
        .slice(0, -1)
        .join('/');
      if (resolve(parentPath) === resolve(parent.path)) {
        child.links = child.links || {};
        child.links.parent = linkToNode(parent);
        parent.links.children.push(linkToNode(child));
      }
    });
  });
};

export const linkAdjacent = <T extends Node>(nodes: T[]) => {
  nodes.forEach((node, index) => {
    node.links = node.links || {};
    const previous = nodes[index + 1];
    const next = nodes[index - 1];
    if (previous) {
      node.links.previous = linkToNode(previous);
    }
    if (next) {
      node.links.next = linkToNode(next);
    }
  });
};
