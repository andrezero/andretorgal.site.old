import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { PostAbstract } from '../../elements/PostAbstract/PostAbstract.component';
import { PostContents } from '../../elements/PostContents/PostContents.component';

import { PostNode } from '../../types/Post.models';

import './PostItem.scss';

interface Props {
  post: PostNode;
}

export const PostItem: React.StatelessComponent<Props> = ({ post }) => {
  return (
    <article className="post-item">
      <header>
        <NodeDate date={post.created} />
        <h1 className="page-title">{post.title}</h1>
      </header>
      <PostAbstract>{post.abstract}</PostAbstract>
      <PostContents>{post.content}</PostContents>
      <footer>
        <NodeMeta node={post} />
      </footer>
    </article>
  );
};
