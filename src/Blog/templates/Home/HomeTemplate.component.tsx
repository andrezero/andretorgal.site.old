import * as React from 'react';
import { Head } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';

import { Post } from '../../types/Post.model';

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
      <h1 className="title-page" aria-label={page.title}>
        Latest Posts
      </h1>
      <ul className="article-list">
        {posts.map((post: Post) => (
          <li key={post.path}>
            <Link to={post.path}>{post.title}</Link>
            <MarkdownBasic>{post.abstract}</MarkdownBasic>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
