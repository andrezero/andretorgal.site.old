import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { Tag } from '../../../Shared/types/Node.models';

import './TagList.scss';

interface Props {
  tags: Tag[];
}

export const TagList: React.StatelessComponent<Props> = ({ tags }) => {
  if (!tags.length) {
    return <></>;
  }
  return (
    <ul className="tag-list">
      {tags.map((tag, index) => (
        <li key={tag} className={`tag ${tag}`}>
          <Link href={`/tags/${tag}`}>{tag}</Link>
          {index < tags.length - 1 ? ',' : ''}
        </li>
      ))}
    </ul>
  );
};
