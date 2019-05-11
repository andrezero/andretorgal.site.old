import * as React from 'react';

import { Node } from '../../../Shared/types/Node.models';

import { NodeListItem } from '../../blocks/NodeListItem/NodeListItem.component';
import './NodeList.scss';

interface Props {
  nodes: Node[];
  level?: number;
}

export const NodeList: React.StatelessComponent<Props> = ({ nodes, level }) => {
  return (
    <div className="node-list">
      {nodes.map((node: Node) => (
        <NodeListItem key={node.path} node={node} level={level} />
      ))}
    </div>
  );
};
