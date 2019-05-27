import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { NodeLastUpdated } from '../../../Shared/elements/NodeLastUpdated/NodeLastUpdated.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { hasTag } from '../../../Shared/lib/nodes';

import { PageNode } from '../../../Shared/types/Page.models';

import './PageCard.scss';

interface Props {
  node: PageNode;
  level?: number;
  footer?: React.ReactNode;
}

export const PageCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <>
      <Tag className="node-title">
        <Link href={node.path}>{node.title}</Link>
      </Tag>
      <NodeLastUpdated node={node} />
    </>
  );
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="page-card" header={header} footer={footer} draft={draft}>
      <MarkdownBase>{node.abstract}</MarkdownBase>
      <ReadMore path={node.path} />
    </BaseCard>
  );
};
