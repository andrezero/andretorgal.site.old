import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import { PostNode } from '../../types/Post.models';

import './BlogNav.scss';

interface Props {
  post: PostNode;
}

export const BlogNav: React.StatelessComponent<Props> = ({ post }) => {
  return (
    // @todo extract to blocks/BlogNav
    <header className="blog-nav" role="navigation" aria-label="navigating blogs and posts">
      <nav className="container">
        <Link id="aria-page-title" href="/posts/">
          Blog Home
        </Link>
        <Link id="aria-page-title" href="/posts/">
          Next Post
        </Link>
        <Link id="aria-page-title" href="/posts/">
          Previous Post
        </Link>
      </nav>
    </header>
  );
};
