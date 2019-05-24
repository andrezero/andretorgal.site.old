import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { linkHierarchy } from '../Shared/lib/links';
import { filterHasNotTag, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { filter } from 'bluebird';
import { PageNode } from '../Shared/types/Page.models';

const nodeDefaults = {
  template: 'Site/Page',
  path: '{path}'
};

const newPageFromFile = (stage: string, file: FileSysNode): PageNode => {
  const fileContents = parseFileContents(stage, file);
  const { node, data } = newNodeFromFile('page', fileContents, nodeDefaults);

  const page = node as PageNode;
  page.features.hero = data.hero;

  return page;
};

export const loadPages = async (stage: string): Promise<PageNode[]> => {
  const tree = await collect('./content/pages', true);
  const flattened = flatten(tree, 'indexes');
  const nodes = flattened.map(file => newPageFromFile(stage, file));
  const filtered = stage === 'prod' ? nodes.filter(filterHasNotTag('draft')) : nodes;
  linkHierarchy(filtered);
  return nodes;
};
