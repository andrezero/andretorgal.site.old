import * as React from 'react';

import { Link } from '../../elements/Link/Link.component';
import { NodeLink } from '../../types/Node.models';

import './NodeParent.scss';

interface Props {
  parent: NodeLink;
}

export const NodeParent: React.StatelessComponent<Props> = ({ parent }) => {
  if (!parent) {
    return <></>;
  }
  return (
    <div className="node-parent">
      <Link href={parent.path}>{parent.title}</Link>
    </div>
  );
};
