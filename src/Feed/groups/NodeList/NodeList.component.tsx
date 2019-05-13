import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { Node } from '../../../Shared/types/Node.models';

import { NodeListItem } from '../../blocks/NodeListItem/NodeListItem.component';
import { NodeType } from '../../elements/NodeType/NodeType.component';

import './NodeList.scss';

interface Props {
  nodes: Node[];
  level?: number;
}

export const NodeList: React.StatelessComponent<Props> = ({ nodes, level }) => {
  return (
    <div className="node-list">
      {nodes.map((node: Node) => {
        const footer = (
          <>
            <NodeType node={node} />
            <NodeMeta node={node} />
          </>
        );
        return <NodeListItem key={node.path} node={node} level={level} footer={footer} />;
      })}
    </div>
  );
};
