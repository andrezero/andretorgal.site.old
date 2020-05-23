import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { hasTag } from '../../../Shared/lib/nodes';

import { ExpNode } from '../../types/Exp.models';

import './ExpCard.scss';

interface Props {
  node: ExpNode;
  level?: number;
  footer?: React.ReactNode;
}

export const ExpCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <Link href={node.path}>{node.title}</Link>
    </Tag>
  );
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="exp-card" header={header} footer={footer} draft={draft}>
      <MarkdownBase>{node.abstract}</MarkdownBase>
      <ReadMore path={node.path} />
    </BaseCard>
  );
};
