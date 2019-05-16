import dayjs = require('dayjs');

import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { linkAdjacent } from '../Shared/lib/links';
import { makePath, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { PostNode } from './types/Post.models';

const nodeDefaults = {
  template: 'Blog/Post',
  prefix: 'posts'
};

const newPostFromFile = (file: FileSysNode): PostNode => {
  const fileContents = parseFileContents(file);

  const { node, data } = newNodeFromFile('post', fileContents, nodeDefaults);

  const post = node as PostNode;
  const date = dayjs(data.created)
    .format('YYYY-MMM')
    .toLowerCase();
  post.path = makePath(['posts', date], data.path, post.title);

  return post;
};

export const loadPosts = async (): Promise<PostNode[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children);
  const nodes = flattened.map(newPostFromFile);
  const sorted = nodes.sort((p1, p2) => p2.created.getTime() - p1.created.getTime());
  linkAdjacent(sorted);
  return sorted;
};
