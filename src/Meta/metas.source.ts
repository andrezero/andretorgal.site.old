import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { linkHierarchy } from '../Shared/lib/links';
import { filterHasNotTag, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { MetaNode } from './types/Meta.models';

const nodeDefaults = {
  template: 'Meta/Page',
  prefix: 'meta',
  path: '{path}'
};

const newMetaFromFile = (stage: string, file: FileSysNode): MetaNode => {
  const fileContents = parseFileContents(stage, file);
  const { node } = newNodeFromFile('page', fileContents, nodeDefaults);

  const meta = node as MetaNode;

  return meta;
};

export const loadMetas = async (stage: string): Promise<MetaNode[]> => {
  const tree = await collect('./meta', true);
  const flattened = flatten(tree, 'all');
  const nodes = flattened.map(file => newMetaFromFile(stage, file));
  const filtered = stage === 'prod' ? nodes.filter(filterHasNotTag('draft')) : nodes;
  linkHierarchy(filtered);
  return nodes;
};
