import * as React from 'react';
import { Head } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';

import { PostAbstract } from '../../elements/PostAbstract/PostAbstract.component';
import { PostContents } from '../../elements/PostContents/PostContents.component';
import { Post } from '../../types/Post.model';

import * as styles from './PostTemplate.module.scss';

interface Props {
  post: Post;
}

export const PostTemplate: React.StatelessComponent<Props> = props => {
  return (
    <Layout>
      <Head title={props.post.title} meta={props.post.meta} />
      <Link to="/posts/">{'<'} Back</Link>
      <h1 className={styles.Post}>{props.post.title}</h1>
      <PostAbstract content={props.post.abstract} />
      <PostContents content={props.post.content} />
    </Layout>
  );
};
