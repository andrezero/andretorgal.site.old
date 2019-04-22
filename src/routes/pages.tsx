import dayjs from 'dayjs';

import { DirectoryNode, FileNode } from 'types/File.types';
import { Page, PageRoute, PageRouteData } from 'types/Page.model';
import { makeContent, parseFileContents } from '../process/content';
import { makeMeta, makePath, makeTemplate, makeTitle } from '../process/data';
import { collect, map } from '../process/files';

const createPage = (node: FileNode | DirectoryNode): Page => {
  const { data, content, abstract } = parseFileContents(node.contents);
  data.title = makeTitle(data.title, node.name);
  data.created = dayjs(node.created);
  data.updated = dayjs(node.created);
  const { path, rel } = makePath([], data.path, data.title);
  const template = makeTemplate(data, 'Page');
  const meta = makeMeta(data);

  return {
    title: data.title,
    rel,
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

const pageRoute = (node: FileNode | DirectoryNode): PageRoute => {
  const page = createPage(node);
  return {
    path: node.name || '/',
    template: page.template,
    getData: (): PageRouteData => ({ page })
  };
};

const loadPages = async (): Promise<PageRoute | void> => {
  const tree = await collect('./content/pages', true);
  return map<DirectoryNode, PageRoute>(tree, pageRoute);
};

const getRoutes = async () => {
  const root = await loadPages();
  return [root];
};

export default getRoutes;
