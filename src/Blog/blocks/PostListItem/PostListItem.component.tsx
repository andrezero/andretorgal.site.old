import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';

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
        <time className="post-date">8 Apr, 2017</time>
        <Tag>
          <Link to={post.path}>{post.title}</Link>
        </Tag>
      </header>
      <MarkdownBasic>{post.abstract}</MarkdownBasic>
      <Link href="/posts/2017-04-08/london-lean-kanban-days-2017" className="read-more">
        Read more
      </Link>
      <div className="post-meta">
        <p className="post-published">
          Published{' '}
          <Link href="/posts/2017-04-08/london-lean-kanban-days-2017" className="post-permalink">
            8 Apr, 2017
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
