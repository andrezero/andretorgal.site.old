import dayjs from 'dayjs';
import matter from 'gray-matter';

import { makeMeta, makePath, makeTemplate, makeTitle } from '../lib/file-data';
import { collect, Directory, File, map } from '../lib/files';
import { Page, PageRoute, PageRouteData } from '../types/Page.model';

const processFile = (node: File | Directory): PageRoute => {
  const { data, content } = matter(node.contents);
  data.title = makeTitle(data.title, node.name);
  data.created = dayjs(node.created);
  data.updated = dayjs(node.created);
  const { path, rel } = makePath([], data.path, data.title);
  const template = makeTemplate(data, 'Page');
  const meta = makeMeta(data);

  const page: Page = {
    title: data.title,
    rel,
    path,
    content,
    template,
    created: data.created.toDate(),
    updated: data.updated.toDate(),
    tags: data.tags,
    meta
  };
  return {
    path: node.name || '/',
    template: page.template,
    getData: (): PageRouteData => ({ page })
  };
};

const loadPages = async (): Promise<PageRoute | void> => {
  const tree = await collect('./content/pages', true);
  return map<Directory, PageRoute>(tree, processFile);
};

const getRoutes = async () => {
  const root = await loadPages();
  return [root];
};

export default getRoutes;
