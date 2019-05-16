import { resolve as pathResolve } from 'path';
import { Node, NodeLink } from '../types/Node.models';

export const linkToNode = (node: Node): NodeLink => {
  const { type, path, title } = node;
  return { type, path, title };
};

export const dedupeLinks = (links: NodeLink[]) => {
  const pathIndex = {};
  return links.filter(link => {
    return pathIndex.hasOwnProperty(link.path) ? false : (pathIndex[link.path] = true);
  });
};

interface PathIndex {
  [path: string]: Node;
}

const indexNodesByPath = (nodes: Node[]): PathIndex => {
  const index: PathIndex = {};
  nodes.forEach(node => {
    index[pathResolve(node.path)] = node;
  });
  return index;
};

const getNodeParentPath = (child: Node) => {
  const parts = child.path.split('/').slice(0, -1);
  return pathResolve(parts.join('/'));
};

const linkChildAndParent = (child: Node, parent: Node) => {
  const { links: childLinks } = child.meta;
  const { links: parentLinks } = parent.meta;

  childLinks.parent = linkToNode(parent);
  parentLinks.children = parentLinks.children || [];
  parentLinks.children.push(linkToNode(child));
};

const linkChildToAllParents = (index: PathIndex, child: Node, currentParent: Node) => {
  const { links: childLinks } = child.meta;
  childLinks.parents = childLinks.parents || [];
  childLinks.parents.push(linkToNode(currentParent));

  const parentPath = getNodeParentPath(currentParent);
  if (index[parentPath]) {
    const nextParent = index[parentPath];
    linkChildToAllParents(index, child, nextParent);
  }
};

const linkNode = (index: PathIndex, child: Node, allParents?: boolean) => {
  const parentPath = getNodeParentPath(child);
  if (index[parentPath]) {
    const parent = index[parentPath];
    linkChildAndParent(child, parent);
    if (allParents) {
      linkChildToAllParents(index, child, parent);
    }
  }
};

export const linkHierarchy = (nodes: Node[], allParents?: boolean) => {
  const index = indexNodesByPath(nodes);
  nodes.forEach(node => linkNode(index, node, allParents));
};

export const linkAdjacent = (nodes: Node[]) => {
  nodes.forEach((node, index) => {
    const previous = nodes[index + 1];
    const next = nodes[index - 1];
    const { links } = node.meta;
    if (previous) {
      links.previous = linkToNode(previous);
    }
    if (next) {
      links.next = linkToNode(next);
    }
  });
};
