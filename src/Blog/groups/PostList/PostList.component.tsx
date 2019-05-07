import * as React from 'react';

import { Post } from '../../types/Post.models';

import { PostListItem } from '../../blocks/PostListItem/PostListItem.component';
import './PostList.scss';

interface Props {
  posts: Post[];
}

export const PostList: React.StatelessComponent<Props> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post: Post) => (
        <PostListItem key={post.path} post={post} />
      ))}
    </div>
  );
};
