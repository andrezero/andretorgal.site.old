import { makeContent, parseFileContents } from '../Shared/lib/content';
import { makePath, makeTitle } from '../Shared/lib/data';
import { collect, flatten } from '../Shared/lib/files';
import { makeMeta } from '../Shared/lib/meta';
import { FileSysNode } from '../Shared/lib/types/File.types';
import { Node, NodeMeta, Tag } from '../Shared/types/Node.models';

import { sortCreated } from '../Shared/lib/nodes';
import { slug } from '../Shared/lib/strings';
import { TagNode } from './types/Tag.models';

const newTag = (
  title: string,
  path?: string,
  content?: string,
  abstract?: string,
  template: string = 'Taxonomy/Tag',
  created?: Date,
  updated?: Date,
  tags?: Tag[],
  meta?: NodeMeta
): TagNode => {
  return {
    type: 'tag',
    name: slug(title),
    count: 0,
    title,
    path: makePath(['tags'], path, title),
    content: makeContent(content),
    abstract: makeContent(abstract),
    template,
    created,
    updated,
    tags,
    meta
  };
};

const createTag = (file: FileSysNode): TagNode => {
  const { data, content, abstract } = parseFileContents(file);
  data.title = makeTitle(data.title, file.name);

  return newTag(
    data.title,
    file.path,
    content,
    abstract,
    data.template,
    data.created.toDate(),
    data.updated.toDate(),
    data.tags,
    makeMeta(data)
  );
};

export const loadTags = async (): Promise<TagNode[]> => {
  const tree = await collect('./content/tags', true);
  const flattened = flatten(tree.children);
  return flattened.map(createTag);
};

interface TagIndex {
  [name: string]: TagNode;
}

const indexTagNodes = (tags: TagNode[]): TagIndex => {
  const index: TagIndex = {};
  tags.forEach(tag => {
    index[tag.name] = tag;
  });
  return index;
};

const indexTag = (tagIndex: TagIndex, node: Node, tag: string, ret: TagNode[]) => {
  if (!tagIndex[tag]) {
    const tagNode = newTag(tag);
    tagNode.created = node.created;
    tagNode.updated = node.updated;
    tagNode.count = 1;
    ret.push(tagNode);
    tagIndex[tagNode.name] = tagNode;
  } else {
    tagIndex[tag].created = node.created;
    tagIndex[tag].updated = node.updated;
    tagIndex[tag].count++;
  }
};

export const generateTags = (tagNodes: TagNode[], nodes: Node[]): TagNode[] => {
  const tagIndex = indexTagNodes(tagNodes);
  const ret = [...tagNodes];
  const sortedNodes = [...nodes].sort(sortCreated);
  sortedNodes.forEach(node => {
    (node.tags || []).forEach(tag => {
      indexTag(tagIndex, node, tag, ret);
    });
  });
  return ret.filter(tag => tag.count).sort((t1, t2) => t2.count - t1.count);
};
