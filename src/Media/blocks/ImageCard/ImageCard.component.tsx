import * as React from 'react';

import { BaseCard } from '../../../Shared/blocks/BaseCard/BaseCard.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeImg } from '../../../Shared/elements/NodeImg/NodeImg.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { hasTag } from '../../../Shared/lib/nodes';

import { MediaNode } from '../../types/Media.models';

import './ImageCard.scss';

interface Props {
  node: MediaNode;
  level?: number;
  footer?: React.ReactNode;
}

export const ImageCard: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <>
      <NodeDate date={node.created} />
      <Tag className="node-title">{node.title}</Tag>
    </>
  );
  const profiles = ['image.small', 'image.medium', 'image.large'];
  const draft = hasTag(node, 'draft');
  return (
    <BaseCard className="media-image-card" header={header} footer={footer} href={node.path} draft={draft}>
      <div className="image">
        <NodeImg node={node} src={node.meta.asset.url} profiles={profiles} />
      </div>
      <NodeMarkdown node={node} strip={true}>
        {node.abstract}
      </NodeMarkdown>
    </BaseCard>
  );
};
