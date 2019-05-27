import * as React from 'react';

import { PostNode } from '../../types/Post.models';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { PostCard } from '../../blocks/PostCard/PostCard.component';

import './PostList.scss';

interface Props {
  posts: PostNode[];
  level?: number;
}

export const PostList: React.StatelessComponent<Props> = ({ posts, level }) => {
  return (
    <div className="post-list">
      {posts.map((post: PostNode) => (
        <PostCard key={post.path} node={post} level={level} footer={<NodeMeta node={post} />} />
      ))}
    </div>
  );
};
