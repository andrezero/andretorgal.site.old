import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { filterHasNotTag, newNode, newNodeFromFile, sortCreated } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { Node } from '../Shared/types/Node.models';
import { TagNode } from './types/Tag.models';

const nodeDefaults = {
  template: 'Taxonomy/Tag',
  prefix: 'tags'
};

const newTag = (name: string): TagNode => {
  const tag = newNode('tag', name, nodeDefaults) as TagNode;
  tag.count = 0;

  return tag;
};

const newTagFromFile = (stage: string, file: FileSysNode): TagNode => {
  const fileContents = parseFileContents(stage, file);
  const defaults = { ...nodeDefaults, path: '{name}', title: '{name}' };
  const { node } = newNodeFromFile('tag', fileContents, defaults);

  const tag = node as TagNode;
  tag.count = 0;

  return tag;
};

export const loadTags = async (stage: string): Promise<TagNode[]> => {
  const tree = await collect('./content/tags', true);
  const flattened = flatten(tree.children);
  const nodes = flattened.map(file => newTagFromFile(stage, file));
  const filtered = stage === 'prod' ? nodes.filter(filterHasNotTag('draft')) : nodes;
  return filtered;
};

interface TagIndex {
  [name: string]: TagNode;
}

const indexNewTag = (tagIndex: TagIndex, tag: string, node: Node): TagNode => {
  const tagNode = newTag(tag);
  tagNode.created = node.created;
  tagNode.updated = node.updated;
  tagNode.count = 1;
  tagIndex[tagNode.title] = tagNode;
  return tagNode;
};

const indexExistingTag = (tagIndex: TagIndex, tag: string, node: Node) => {
  tagIndex[tag].created = node.created;
  tagIndex[tag].updated = node.updated;
  tagIndex[tag].count++;
};

const indexTag = (tagIndex: TagIndex, node: Node, tag: string, nodes: TagNode[]) => {
  if (!tagIndex[tag]) {
    const tagNode = indexNewTag(tagIndex, tag, node);
    nodes.push(tagNode);
  } else {
    indexExistingTag(tagIndex, tag, node);
  }
};

const indexTagNodes = (tags: TagNode[]): TagIndex => {
  const index: TagIndex = {};
  tags.forEach(tag => {
    index[tag.title] = tag;
  });
  return index;
};

export const generateTagsFromNodes = (stage: string, tagNodes: TagNode[], nodes: Node[]): TagNode[] => {
  const tagIndex = indexTagNodes(tagNodes);
  const ret = [...tagNodes];
  const sortedNodes = [...nodes].sort(sortCreated);
  sortedNodes.forEach(node => {
    (node.tags || []).forEach(tag => indexTag(tagIndex, node, tag, ret));
  });
  const filtered = ret.filter(tag => tag.count && (stage !== 'prod' || tag.title !== 'draft'));
  return filtered.sort((t1, t2) => t2.count - t1.count);
};
