import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';

import { ImageCard } from '../ImageCard/ImageCard.component';

import { MediaNode } from '../../types/Media.models';

import './MediaCard.scss';

interface Props {
  node: MediaNode;
  level?: number;
  footer?: React.ReactNode;
}

const map = {
  image: ImageCard
};

const DefaultCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <Link href={node.path}>{node.title}</Link>
    </Tag>
  );
  // const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="media-card" header={header} footer={footer}>
      <MarkdownBase>{node.abstract}</MarkdownBase>
    </BaseCard>
  );
};

export const MediaCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Component = map[node.meta.asset.type];
  if (Component) {
    return <Component node={node} level={level} footer={footer} />;
  }
  return <DefaultCard node={node} level={level} footer={footer} />;
};
