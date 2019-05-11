import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import { PostNode } from '../../types/Post.models';

import './BlogNav.scss';

interface Props {
  post: PostNode;
}

export const BlogNav: React.StatelessComponent<Props> = ({ post }) => {
  return (
    <header className="blog-nav" role="navigation" aria-label="navigating blogs and posts">
      <nav className="container">
        <Link href="/posts/">Blog Home</Link>
        {post.links.previous && (
          <Link href={post.links.previous.path} title={post.links.previous.title}>
            Previous Post
          </Link>
        )}
        {post.links.next && (
          <Link href={post.links.next.path} title={post.links.next.title}>
            Next Post
          </Link>
        )}
      </nav>
    </header>
  );
};
