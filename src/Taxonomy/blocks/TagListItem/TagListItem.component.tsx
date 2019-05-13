import * as React from 'react';

import { BaseListItem as ListItemBase } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';

import { TagNode } from '../../types/Tag.models';

import './TagListItem.scss';

interface Props {
  node: TagNode;
  level?: number;
  footer?: React.ReactNode;
}

export const TagListItem: React.StatelessComponent<Props> = ({ node: tag, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const tagCount = tag.count > 1 ? `Used in ${tag.count} items` : `Used in ${tag.count} item`;
  const header = (
    <Tag className="node-title">
      <SROnly>{tagCount}</SROnly>
      <div aria-hidden={true} className="count">
        {tag.count}
      </div>
      <span className="hashtag">#{tag.title}</span>
    </Tag>
  );
  return (
    <ListItemBase className="tag-list-item" header={header} footer={footer} href={tag.path}>
      <MarkdownBasic>{tag.abstract}</MarkdownBasic>
    </ListItemBase>
  );
};
