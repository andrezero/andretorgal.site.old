import dayjs from 'dayjs';
import matter from 'gray-matter';

import { makePath, makeTemplate, makeTitle } from '../lib/file-data';
import { collect, Directory, File, map } from '../lib/files';
import { Page, PageRoute } from '../types/Page.model';

const processFile = (node: File | Directory): PageRoute => {
  const { data, content } = matter(node.contents);
  const title = makeTitle(data, node.name);
  const created = dayjs(node.created);
  const updated = dayjs(node.created);
  const { path, rel } = makePath([], data.path, title);
  const template = makeTemplate(data, 'Page');

  const page: Page = {
    title,
    rel,
    path,
    content,
    template,
    created: created.toDate(),
    updated: updated.toDate(),
    tags: data.tags
  };
  return {
    path: node.name || '/',
    template: page.template,
    getData: () => ({ page })
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
