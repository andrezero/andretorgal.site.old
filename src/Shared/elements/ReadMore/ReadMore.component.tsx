import * as React from 'react';

import { Link } from '../Link/Link.component';

import './ReadMore.scss';

interface Props {
  path: string;
  children?: React.ReactNode;
}

export const ReadMore: React.StatelessComponent<Props> = ({ path, children = 'Read more' }) => {
  return (
    <Link href={path} className="read-more">
      {children}
    </Link>
  );
};
