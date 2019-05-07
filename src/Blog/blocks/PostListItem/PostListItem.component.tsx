import * as React from 'react';

import { FormattedDate } from '../../../Shared/elements/FormattedDate/FormattedDate.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';

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
          <Link to={post.path}>{post.title}</Link>
        </Tag>
      </header>
      <MarkdownBasic>{post.abstract}</MarkdownBasic>
      <Link href={post.path} className="read-more">
        Read more
      </Link>
      <div className="post-meta">
        <p className="post-published">
          Published{' '}
          <Link href={post.path} className="post-permalink">
            <FormattedDate date={post.created} />
          </Link>
          by{' '}
          <Link href="/about" className="author">
            André Torgal
          </Link>
          , under:
        </p>
        <ul className="tags">
          <li className="tag">
            <a href="/tag/agile">agile</a>,
          </li>
          <li className="tag">
            <a href="/tag/lean">lean</a>,
          </li>
          <li className="tag">
            <a href="/tag/kanban">kanban</a>,
          </li>
          <li className="tag">
            <a href="/tag/conference">conference</a>,
          </li>
        </ul>
      </div>
    </article>
  );
};
