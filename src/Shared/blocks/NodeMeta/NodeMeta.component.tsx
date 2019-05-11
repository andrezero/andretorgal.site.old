import * as React from 'react';

import { FormattedDate } from '../../elements/FormattedDate/FormattedDate.component';
import { Link } from '../../elements/Link/Link.component';
import { Node } from '../../types/Node.models';

import { TagList } from '../../../Taxonomy/blocks/TagList/TagList.component';

import './NodeMeta.scss';

interface Props {
  node: Node;
}

export const NodeMeta: React.StatelessComponent<Props> = ({ node }) => {
  return (
    <div className="node-meta">
      <p className="node-published">
        Published{' '}
        <Link href={node.path} className="node-permalink">
          <FormattedDate date={node.created} />
        </Link>{' '}
        by{' '}
        <Link href="/about" className="author">
          André Torgal
        </Link>
        {node.tags && node.tags.length && <span>, under: </span>}
      </p>{' '}
      <TagList tags={node.tags} />
    </div>
  );
};
