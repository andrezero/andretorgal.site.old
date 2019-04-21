import * as React from 'react';
import { useRouteData } from 'react-static';

import './Blog.css';

import Link from 'atoms/Link/Link.component';
import LayoutContainer from 'layout/LayoutContainer/LayoutContainer.component';

export default function Blog() {
  const { posts } = (useRouteData as any)();
  return (
    <LayoutContainer>
      <h2 className="title-page" aria-label="latest blog posts">
        Latest Posts
      </h2>
      <ul className="article-list">
        {posts.map((post: any) => (
          <li key={post.path}>
            <Link to={post.path}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </LayoutContainer>
  );
}
