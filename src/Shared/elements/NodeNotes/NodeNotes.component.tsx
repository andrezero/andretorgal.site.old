import * as React from 'react';

import { Node } from '../../types/Node.models';
import { NodeMarkdown } from '../NodeMarkdown/NodeMarkdown.component';

import './NodeNotes.scss';

interface Props {
  node: Node;
}

export const NodeNotes: React.StatelessComponent<Props> = ({ node }) => {
  return (
    <div className="node-notes">
      <h3>Notes</h3>
      <NodeMarkdown node={node}>{node.meta.notes}</NodeMarkdown>
    </div>
  );
};
