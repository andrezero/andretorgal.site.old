import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';

import { Post } from '../../types/Post.model';

import './PostList.scss';

interface Props {
  posts: Post[];
}

export const PostList: React.StatelessComponent<Props> = ({ posts }) => {
  return (
    <ul className="post-list">
      {posts.map((post: Post) => (
        <li key={post.path}>
          <h3>
            <Link to={post.path}>{post.title}</Link>
          </h3>
          <MarkdownBasic>{post.abstract}</MarkdownBasic>
        </li>
      ))}
    </ul>
  );
};
