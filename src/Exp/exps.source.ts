import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { filterHasNotTag, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';

import { ExpNode } from './types/Exp.models';

const nodeDefaults = {
  template: 'Exp/Page',
  prefix: 'experiment',
  path: '{path}'
};

const newExpFromFile = (stage: string, file: FileSysNode): ExpNode => {
  const fileContents = parseFileContents(stage, file);
  const { node } = newNodeFromFile('exp', fileContents, nodeDefaults);

  const exp = node as ExpNode;

  return exp;
};

export const loadExps = async (stage: string): Promise<ExpNode[]> => {
  const tree = await collect('./content/exp', true);
  const flattened = flatten(tree, 'indexes');
  const nodes = flattened.map(file => newExpFromFile(stage, file));
  const filtered = stage === 'prod' ? nodes.filter(filterHasNotTag('draft')) : nodes;
  return filtered;
};
