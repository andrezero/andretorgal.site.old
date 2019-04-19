import { collect, map } from '../lib/files';
import { Directory, File } from '../lib/files';
import { Page, PageRoute } from '../types/Page.model';

const processFile = (node: File | Directory): PageRoute => {
  const page: Page = {
    title: node.name,
    content: node.contents,
    path: node.path,
    relPath: node.path,
    template: 'src/containers/Page/Page.container'
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
