import * as React from 'react';
import { Head } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';

import { PostAbstract } from '../../elements/PostAbstract/PostAbstract.component';
import { PostContents } from '../../elements/PostContents/PostContents.component';
import { Post } from '../../types/Post.model';

import * as styles from './PostTemplate.module.scss';

interface Props {
  post: Post;
}

export const PostTemplate: React.StatelessComponent<Props> = ({ post }) => {
  const subHeader = (
    <header role="navigation" aria-label="navigating blogs and posts">
      <Link id="aria-page-title" to="/posts/">
        Blog Home
      </Link>
      <Link id="aria-page-title" to="/posts/">
        Next Post
      </Link>
      <Link id="aria-page-title" to="/posts/">
        Previous Post
      </Link>
    </header>
  );
  const header = <SiteHeader page={post}>{subHeader}</SiteHeader>;
  const footer = <SiteFooter />;
  return (
    <Layout className="blog-post" header={header} footer={footer}>
      <Head title={post.title} meta={post.meta} />
      <article className={`post ${styles.Module}`}>
        <h1 className={styles.Title}>{post.title}</h1>
        <PostAbstract>{post.abstract}</PostAbstract>
        <PostContents>{post.content}</PostContents>
      </article>
    </Layout>
  );
};
