import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { PostNode } from '../../types/Post.models';

import './PostDetail.scss';

interface Props {
  post: PostNode;
}

export const PostDetail: React.StatelessComponent<Props> = ({ post }) => {
  const header = (
    <>
      <NodeDate date={post.created} />
      <h1 className="page-title">{post.title}</h1>
    </>
  );
  const footer = <NodeMeta node={post} />;
  return (
    <BaseDetail className="post-detail" node={post} header={header} footer={footer}>
      <NodeMarkdown node={post} className="post-abstract">
        {post.abstract}
      </NodeMarkdown>
      <NodeMarkdown node={post} className="post-content">
        {post.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
