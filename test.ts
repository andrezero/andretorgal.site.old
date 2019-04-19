import { collect, map } from './src/lib/files';
import { Node, File, Directory } from './src/lib/files';
import { Page } from './src/types/Page.model';

const processFile = (node: File | Directory): Page => {
  return {
    title: node.name,
    content: node.contents,
    path: node.path,
    relPath: node.path,
    template: ''
  };
};

const loadPages = async (): Promise<Page> => {
  const tree = await collect('./content/pages', true);
  console.log('tree', tree);
  return map<Directory, Page>(tree, processFile) as Page;
};

const main = async () => {
  const root = await loadPages();
  console.log('root', root.children);
};

main();
