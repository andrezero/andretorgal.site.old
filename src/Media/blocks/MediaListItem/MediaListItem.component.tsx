import * as React from 'react';

import { BaseListItem } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';

import { ImageListItem } from '../ImageListItem/ImageListItem.component';

import { MediaNode } from '../../types/Media.models';

import './MediaListItem.scss';

interface Props {
  media: MediaNode;
  level?: number;
  footer?: React.ReactNode;
}

const map = {
  image: ImageListItem
};

const DefaultListItem: React.StatelessComponent<Props> = ({ media, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <Link href={media.path}>{media.title}</Link>
    </Tag>
  );
  return (
    <BaseListItem className="media-list-item" header={header} footer={footer}>
      <MarkdownBase>{media.abstract}</MarkdownBase>
    </BaseListItem>
  );
};

export const MediaListItem: React.StatelessComponent<Props> = ({ media, level = 2, footer }) => {
  const Component = map[media.meta.asset.type];
  if (Component) {
    return <Component media={media} level={level} footer={footer} />;
  }
  return <DefaultListItem media={media} level={level} footer={footer} />;
};
