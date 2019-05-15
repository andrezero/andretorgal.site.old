import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { linkHierarchy, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { PageNode } from '../Shared/types/Page.models';

const nodeDefaults = {
  template: 'Site/Page',
  path: '{path}'
};

const newPageFromFile = (file: FileSysNode): PageNode => {
  const fileContents = parseFileContents(file);
  const { node, data } = newNodeFromFile('page', fileContents, nodeDefaults);

  const page = node as PageNode;
  page.features.hero = data.hero;

  return page;
};

export const loadPages = async (): Promise<PageNode[]> => {
  const tree = await collect('./content/pages', true);
  const flattened = flatten(tree, 'indexes');
  const nodes = flattened.map(newPageFromFile);
  linkHierarchy(nodes);
  return nodes;
};
