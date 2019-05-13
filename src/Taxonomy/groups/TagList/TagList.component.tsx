import * as React from 'react';

import { TagNode } from '../../types/Tag.models';

import { TagListItem } from '../../blocks/TagListItem/TagListItem.component';
import './TagList.scss';

interface Props {
  tags: TagNode[];
  level?: number;
}

export const TagList: React.StatelessComponent<Props> = ({ tags, level }) => {
  return (
    <div className="tag-list">
      {tags.map((tag: TagNode) => (
        <TagListItem key={tag.path} node={tag} level={level} />
      ))}
    </div>
  );
};
