import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './Blog.css';

import Link from '../../atoms/Link/Link.component';
import Markdown from '../../atoms/Markdown/Markdown.component';
import DefaultLayout from '../../layout/DefaultLayout/DefaultLayout.component';
import { Post, PostListRouteData } from '../../types/Post.model';

const BlogContainer: React.StatelessComponent<{}> = () => {
  const routeData: PostListRouteData = useRouteData();
  const { page, posts } = routeData;
  return (
    <DefaultLayout>
      <Head title="Recent posts" meta={page.meta} />
      <h1 className="title-page" aria-label={page.title}>
        Latest Posts
      </h1>
      <ul className="article-list">
        {posts.map((post: Post) => (
          <li key={post.path}>
            <Link to={post.path}>{post.title}</Link>
            <Markdown text={post.abstract.source} stripped={true} />
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};

export default BlogContainer;
