import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import { PostNode } from '../../types/Post.models';

import './BlogNav.scss';

interface Props {
  post: PostNode;
}

export const BlogNav: React.StatelessComponent<Props> = ({ post }) => {
  const { links } = post.meta;
  return (
    <header className="blog-nav" role="navigation" aria-label="navigating blogs and posts">
      <nav className="container">
        <Link href="/posts/">Blog Home</Link>
        {links.previous && (
          <Link href={links.previous.path} title={links.previous.title}>
            Previous Post
          </Link>
        )}
        {links.next && (
          <Link href={links.next.path} title={links.next.title}>
            Next Post
          </Link>
        )}
      </nav>
    </header>
  );
};
