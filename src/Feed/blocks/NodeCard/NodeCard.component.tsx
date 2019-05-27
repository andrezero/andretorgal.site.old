import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { hasTag } from '../../../Shared/lib/nodes';
import { Node } from '../../../Shared/types/Node.models';

import { PostCard } from '../../../Blog/blocks/PostCard/PostCard.component';
import { MediaCard } from '../../../Media/blocks/MediaCard/MediaCard.component';
import { MetaCard } from '../../../Meta/blocks/MetaCard/MetaCard.component';
import { PageCard } from '../../../Site/blocks/PageCard/PageCard.component';
import { TagCard } from '../../../Taxonomy/blocks/TagCard/TagCard.component';

import './NodeCard.scss';

interface Props {
  node: Node;
  level?: number;
  footer?: React.ReactNode;
}

const map = {
  page: PageCard,
  post: PostCard,
  meta: MetaCard,
  media: MediaCard,
  tag: TagCard
};

const DefaultCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <Link href={node.path}>{node.title}</Link>
    </Tag>
  );
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="node-card" header={header} footer={footer} draft={draft}>
      <MarkdownBase>{node.abstract}</MarkdownBase>
      <ReadMore path={node.path} />
    </BaseCard>
  );
};

export const NodeCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Component = map[node.type];
  if (Component) {
    return <Component node={node} level={level} footer={footer} />;
  }
  return <DefaultCard node={node} level={level} footer={footer} />;
};
