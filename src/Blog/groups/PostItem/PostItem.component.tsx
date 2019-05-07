import * as React from 'react';

import { PostAbstract } from '../../elements/PostAbstract/PostAbstract.component';
import { PostContents } from '../../elements/PostContents/PostContents.component';
import { Post } from '../../types/Post.model';

import './PostItem.scss';

interface Props {
  post: Post;
}

export const PostItem: React.StatelessComponent<Props> = ({ post }) => {
  return (
    <article className="post-item">
      <h1 className="page-title">{post.title}</h1>
      <PostAbstract>{post.abstract}</PostAbstract>
      <PostContents>{post.content}</PostContents>
    </article>
  );
};
