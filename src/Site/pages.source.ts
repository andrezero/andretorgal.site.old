import { makeContent, parseFileContents } from '../Shared/lib/content';
import { makePath, makeTitle } from '../Shared/lib/data';
import { collect, flatten } from '../Shared/lib/files';
import { makeMeta } from '../Shared/lib/meta';
import { linkHierarchy } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';
import { PageNode } from '../Shared/types/Page.models';

const createPage = (file: FileSysNode): PageNode => {
  const { data, content, abstract } = parseFileContents(file);
  data.title = makeTitle(data.title, file.name);
  const path = makePath([], file.path);
  const template = data.template;
  const meta = makeMeta(data, abstract, content);

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
    meta,
    hero: data.hero
  };
};

export const loadPages = async (): Promise<PageNode[]> => {
  const tree = await collect('./content/pages', true);
  const flattened = flatten(tree, 'indexes');
  const nodes = flattened.map(createPage);
  linkHierarchy(nodes);
  return nodes;
};
