import * as React from 'react';

import { Link } from '../../elements/Link/Link.component';
import { NodeLink } from '../../types/Node.models';

import './NodeChildren.scss';

interface Props {
  children: NodeLink[];
}

export const NodeChildren: React.StatelessComponent<Props> = ({ children }) => {
  if (!children || !children.length) {
    return <></>;
  }
  return (
    <ul className="node-children">
      {children.map(child => (
        <li key={child.path}>
          <Link href={child.path}>{child.title}</Link>
        </li>
      ))}
    </ul>
  );
};
