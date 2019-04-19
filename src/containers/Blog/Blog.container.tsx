import { Link } from '@reach/router';
import * as React from 'react';
import { useRouteData } from 'react-static';

import './Blog.css';

export default function Blog() {
  const { posts } = (useRouteData as any)();
  return (
    <div>
      <h3>Blog</h3>
      <ul>
        {posts.map((post: any) => (
          <li key={post.path}>
            <Link to={post.path}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
