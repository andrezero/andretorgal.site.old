import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './Blog.css';

import Link from 'atoms/Link/Link.component';
import LayoutContainer from 'layout/LayoutContainer/LayoutContainer.component';
import { PostListRouteData } from 'types/Post.model';

export default function Blog() {
  const routeData: PostListRouteData = useRouteData();
  const { page, posts } = routeData;
  return (
    <LayoutContainer>
      <Head title="Recent posts" meta={page.meta} />
      <h1 className="title-page" aria-label={page.title}>
        Latest Posts
      </h1>
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
