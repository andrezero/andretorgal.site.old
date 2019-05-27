import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { hasTag } from '../../../Shared/lib/nodes';

import { TagCount } from '../../elements/TagCount/TagCount.component';
import { TagNode } from '../../types/Tag.models';

import './TagCard.scss';

interface Props {
  node: TagNode;
  level?: number;
  footer?: React.ReactNode;
}

export const TagCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <TagCount count={node.count} />
      <span className="hashtag">#{node.title}</span>
    </Tag>
  );
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="tag-card" header={header} footer={footer} href={node.path} draft={draft}>
      {node.abstract && (
        <NodeMarkdown node={node} strip={true}>
          {node.abstract}
        </NodeMarkdown>
      )}
    </BaseCard>
  );
};
