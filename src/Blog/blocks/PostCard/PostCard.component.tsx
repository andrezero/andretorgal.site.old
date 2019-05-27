import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { hasTag } from '../../../Shared/lib/nodes';

import { PostNode } from '../../types/Post.models';

import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';

import './PostCard.scss';

interface Props {
  node: PostNode;
  level?: number;
  footer?: React.ReactNode;
}

export const PostCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <>
      <NodeDate date={node.created} />
      <Tag className="node-title">
        <Link href={node.path}>{node.title}</Link>
      </Tag>
    </>
  );
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="post-card" header={header} footer={footer} draft={draft}>
      <NodeMarkdown node={node} strip={true}>
        {node.abstract}
      </NodeMarkdown>
      <ReadMore path={node.path} />
    </BaseCard>
  );
};
