import { makeContent, parseFileContents } from '../Shared/lib/content';
import { makePath, makeTitle } from '../Shared/lib/data';
import { collect, flatten } from '../Shared/lib/files';
import { makeMeta } from '../Shared/lib/meta';
import { linkHierarchy } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { MetaNode } from './types/Meta.models';

const createMeta = (file: FileSysNode): MetaNode => {
  const { data, content, abstract } = parseFileContents(file);
  data.title = makeTitle(data.title, file.name);
  const path = makePath('meta', file.path);
  const template = data.template;
  const meta = makeMeta(data);

  return {
    type: 'meta',
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

export const loadMetas = async (): Promise<MetaNode[]> => {
  const tree = await collect('./meta', true);
  const flattened = flatten(tree, 'all');
  const nodes = flattened.map(createMeta);
  linkHierarchy(nodes);
  return nodes;
};
