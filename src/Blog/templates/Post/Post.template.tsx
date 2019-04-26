import * as React from 'react';
import { Head } from 'react-static';

import Link from '../../../Shared/atoms/Link/Link.atom';
import Markdown from '../../../Shared/atoms/Markdown/Markdown.atom';
import DefaultLayout from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';

import { Post } from '../../types/Post.model';

import * as styles from './Post.module.scss';

interface Props {
  post: Post;
}

const Template: React.StatelessComponent<Props> = props => {
  return (
    <DefaultLayout>
      <Head title={props.post.title} meta={props.post.meta} />
      <Link to="/posts/">{'<'} Back</Link>
      <h1 className={styles.Post}>{props.post.title}</h1>
      <Markdown text={props.post.abstract.source} />
      <Markdown text={props.post.content.source} />
    </DefaultLayout>
  );
};

export default Template;
