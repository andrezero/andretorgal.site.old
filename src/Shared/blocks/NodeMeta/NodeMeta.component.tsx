import * as React from 'react';

import { FormattedDate } from '../../elements/FormattedDate/FormattedDate.component';
import { Link } from '../../elements/Link/Link.component';
import { NodeDate } from '../../elements/NodeDate/NodeDate.component';

import { TagList } from '../../../Taxonomy/blocks/TagList/TagList.component';
import { Node } from '../../types/Node.models';

import './NodeMeta.scss';

interface Props {
  node: Node;
  showUpdated?: boolean;
}

export const NodeMeta: React.StatelessComponent<Props> = ({ node, showUpdated }) => {
  return (
    <div className="node-meta">
      <p className="node-published">
        <span className="verbose">
          this <em>{node.type}</em> was{' '}
        </span>
        published{' '}
        <Link href={node.path} className="node-permalink">
          <FormattedDate date={node.created} />
        </Link>
        {showUpdated && (
          <>
            {' '}
            and updated: <NodeDate date={node.updated} />
          </>
        )}
        {node.tags && node.tags.length > 0 && <span> under </span>}
      </p>{' '}
      <TagList tags={node.tags} />
    </div>
  );
};
