import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';

import { Post } from '../../types/Post.models';

import './PostListItem.scss';

interface Props {
  post: Post;
  level?: number;
}

export const PostListItem: React.StatelessComponent<Props> = ({ post, level = 2 }) => {
  const Tag = ('h' + level) as React.ElementType;
  return (
    <article key={post.path} className="post-list-item">
      <header>
        <NodeDate date={post.created} />
        <Tag>
          <Link href={post.path}>{post.title}</Link>
        </Tag>
      </header>
      <MarkdownBasic>{post.abstract}</MarkdownBasic>
      <ReadMore path={post.path} />
      <NodeMeta node={post} />
    </article>
  );
};
