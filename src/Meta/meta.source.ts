import dayjs from 'dayjs';

import { makeContent, parseFileContents } from '../Shared/lib/content';
import { makePath, makeTitle } from '../Shared/lib/data';
import { collect, flatten } from '../Shared/lib/files';
import { makeMeta } from '../Shared/lib/meta';
import { FileSysNode } from '../Shared/lib/types/File.types';
import { PageNode } from '../Shared/types/Page.models';

const createMeta = (node: FileSysNode): PageNode => {
  const { data, content, abstract } = parseFileContents(node.contents);
  data.title = makeTitle(data.title, node.name);
  data.created = dayjs(node.created);
  data.updated = dayjs(node.created);
  const path = makePath([], node.path);
  const template = data.template;
  const meta = makeMeta(data);

  return {
    type: 'page',
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

export const loadMetas = async (): Promise<PageNode[]> => {
  const tree = await collect('./meta', true);
  const flattened = flatten(tree.children, 'all');
  flattened.unshift(tree);
  return flattened.map(createMeta);
};
