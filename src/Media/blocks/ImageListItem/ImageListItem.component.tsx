import * as React from 'react';

import { BaseListItem } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';

import { ImageAssetSrc, MediaNode } from '../../types/Media.models';

import { NodeImg } from '../../../Shared/elements/NodeImg/NodeImg.component';
import './ImageListItem.scss';

interface Props {
  media: MediaNode;
  level?: number;
  footer?: React.ReactNode;
}

export const ImageListItem: React.StatelessComponent<Props> = ({ media, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <>
      <NodeDate date={media.created} />
      <Tag className="node-title">
        <Link href={media.path}>{media.title}</Link>
      </Tag>
    </>
  );
  const profiles = ['image.small', 'image.medium', 'image.large'];
  return (
    <BaseListItem className="media-image-list-item" node={media} header={header} footer={footer}>
      <Link href={media.path}>
        <NodeImg node={media} src={media.meta.asset.url} profiles={profiles} />
      </Link>
      <NodeMarkdown node={media} strip={true}>
        {media.abstract}
      </NodeMarkdown>
    </BaseListItem>
  );
};
