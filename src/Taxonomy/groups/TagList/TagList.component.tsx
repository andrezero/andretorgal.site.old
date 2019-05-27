import * as React from 'react';

import { TagCard } from '../../blocks/TagCard/TagCard.component';
import { TagNode } from '../../types/Tag.models';

import './TagList.scss';

interface Props {
  tags: TagNode[];
  level?: number;
}

export const TagList: React.StatelessComponent<Props> = ({ tags, level }) => {
  return (
    <div className="tag-list">
      {tags.map((tag: TagNode) => (
        <TagCard key={tag.path} node={tag} level={level} />
      ))}
    </div>
  );
};
