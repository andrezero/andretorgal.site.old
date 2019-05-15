import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import { TagCount } from '../../elements/TagCount/TagCount.component';
import { TagNode } from '../../types/Tag.models';

import './TagListCompact.scss';

interface Props {
  tags: TagNode[];
}

export const TagListCompact: React.StatelessComponent<Props> = ({ tags }) => {
  return (
    <ul className="tag-list-compact">
      {tags.map((tag: TagNode) => (
        <li key={tag.path}>
          <TagCount count={tag.count} />
          <Link href={tag.path}>#{tag.title}</Link>
        </li>
      ))}
    </ul>
  );
};
