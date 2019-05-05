import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';

import { PostList } from '../../blocks/PostList/PostList.component';
import { Post } from '../../types/Post.model';

import './HomeTemplate.scss';

interface Props {
  page: ContentPage;
  posts: Post[];
}

export const HomeTemplate: React.StatelessComponent<Props> = ({ page, posts }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="blog-home" header={header} footer={footer}>
      <Head title="Recent posts" meta={page.meta} />

      <h1 className="page-title" aria-label={page.title}>
        Latest Posts
      </h1>

      <PostList posts={posts} />
    </Layout>
  );
};
