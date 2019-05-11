import dayjs from 'dayjs';

import { makeContent, parseFileContents } from '../Shared/lib/content';
import { makePath, makeTitle } from '../Shared/lib/data';
import { collect, flatten } from '../Shared/lib/files';
import { makeMeta } from '../Shared/lib/meta';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { PostNode } from './types/Post.models';

const createPost = (file: FileSysNode): PostNode => {
  const { data, content, abstract } = parseFileContents(file.contents);
  data.title = makeTitle(data.title, file.name);
  data.created = dayjs(file.created);
  data.updated = dayjs(file.created);
  const date = data.created.format('YYYY-MMM').toLowerCase();
  const path = makePath(['posts', date], data.path, data.title);
  const template = data.template;
  const meta = makeMeta(data);

  return {
    type: 'post',
    title: data.title,
    path,
    content: makeContent(content),
    abstract: makeContent(abstract),
    template,
    created: data.created.toDate(),
    updated: data.updated.toDate(),
    tags: data.tags,
    meta
  };
};

export const loadPosts = async (): Promise<PostNode[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children);
  const sorted = flattened.sort((p1, p2) => p2.created.getTime() - p1.created.getTime());
  return sorted.map(createPost);
};
