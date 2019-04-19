import { Link } from '@reach/router';
import * as React from 'react';
import { useRouteData } from 'react-static';

import './Post.css';

import Markdown from 'components/Markdown/Markdown.component';

export default function Post() {
  const { post } = (useRouteData as any)();
  return (
    <div>
      <Link to="/blog/">{'<'} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <Markdown text={post.content} />
    </div>
  );
}
