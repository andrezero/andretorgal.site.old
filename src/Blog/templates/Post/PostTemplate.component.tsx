import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { BlogNav } from '../../blocks/PostNav/BlogNav.component';
import { PostItem } from '../../groups/PostItem/PostItem.component';
import { Post } from '../../types/Post.models';

import './PostTemplate.scss';
interface Props {
  post: Post;
}

export const PostTemplate: React.StatelessComponent<Props> = ({ post }) => {
  const subHeader = <BlogNav post={post} />;
  const header = <SiteHeader page={post}>{subHeader}</SiteHeader>;
  const footer = <SiteFooter />;
  return (
    <Layout className="blog-post" header={header} footer={footer}>
      <Head title={post.title} meta={post.meta} />

      <section className="container">
        <PostItem post={post} />
      </section>

      <LinkToTop />
    </Layout>
  );
};
