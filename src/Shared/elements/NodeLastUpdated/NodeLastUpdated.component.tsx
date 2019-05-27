import * as React from 'react';

import { Node } from '../../types/Node.models';
import { NodeDate } from '../NodeDate/NodeDate.component';

import './NodeLastUpdated.scss';

interface Props {
  node: Node;
}

export const NodeLastUpdated: React.StatelessComponent<Props> = ({ node }) => {
  return (
    <p className="node-last-updated">
      Last updated <NodeDate date={node.updated} />
    </p>
  );
};
