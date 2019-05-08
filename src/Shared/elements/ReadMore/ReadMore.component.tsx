import * as React from 'react';

import { Link } from '../Link/Link.component';

import './ReadMore.scss';

interface Props {
  path: string;
}

export const ReadMore: React.StatelessComponent<Props> = ({ path }) => {
  return (
    <Link to={path} className="read-more">
      Read more
    </Link>
  );
};
