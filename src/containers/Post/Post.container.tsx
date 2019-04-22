import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './Post.css';

import Link from 'atoms/Link/Link.component';
import Markdown from 'atoms/Markdown/Markdown.component';
import LayoutContainer from 'layout/LayoutContainer/LayoutContainer.component';
import { PostRouteData } from 'types/Post.model';

export default function Post() {
  const routeData: PostRouteData = useRouteData();
  const { post } = routeData;
  return (
    <LayoutContainer>
      <Head title={post.title} meta={post.meta} />
      <Link to="/posts/">{'<'} Back</Link>
      <h1>{post.title}</h1>
      <Markdown text={post.content} />
    </LayoutContainer>
  );
}
