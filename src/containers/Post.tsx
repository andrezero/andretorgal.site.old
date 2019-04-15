import * as React from 'react';
import { useRouteData } from 'react-static';
//
import { Link } from 'components/Router';

import './Post.css';

export default function Post() {
  const { post } = (useRouteData as any)();
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}
