import * as React from 'react';

import { BaseListItem as ListItemBase } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';

import { TagCount } from '../../elements/TagCount/TagCount.component';
import { TagNode } from '../../types/Tag.models';

import './TagListItem.scss';

interface Props {
  node: TagNode;
  level?: number;
  footer?: React.ReactNode;
}

export const TagListItem: React.StatelessComponent<Props> = ({ node: tag, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <TagCount count={tag.count} />
      <span className="hashtag">#{tag.title}</span>
    </Tag>
  );
  return (
    <ListItemBase className="tag-list-item" header={header} footer={footer} href={tag.path}>
      <MarkdownBase>{tag.abstract}</MarkdownBase>
    </ListItemBase>
  );
};
