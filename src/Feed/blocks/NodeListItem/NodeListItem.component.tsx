import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { Node } from '../../../Shared/types/Node.models';

import './NodeListItem.scss';

interface Props {
  node: Node;
  level?: number;
}

export const NodeListItem: React.StatelessComponent<Props> = ({ node, level = 2 }) => {
  const Tag = ('h' + level) as React.ElementType;
  return (
    <article key={node.path} className="node-list-item">
      <header>
        <NodeDate date={node.created} />
        <Tag>
          <Link href={node.path}>{node.title}</Link>
        </Tag>
      </header>
      {node.abstract.source}
      <MarkdownBasic>{node.abstract}</MarkdownBasic>
      <ReadMore path={node.path} />
      <NodeMeta node={node} />
    </article>
  );
};
