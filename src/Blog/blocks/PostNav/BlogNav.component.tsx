import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import { Post } from '../../types/Post.model';

import './BlogNav.scss';

interface Props {
  post: Post;
}

export const BlogNav: React.StatelessComponent<Props> = ({ post }) => {
  return (
    // @todo extract to blocks/BlogNav
    <header className="blog-nav" role="navigation" aria-label="navigating blogs and posts">
      <nav className="container">
        <Link id="aria-page-title" to="/posts/">
          Blog Home
        </Link>
        <Link id="aria-page-title" to="/posts/">
          Next Post
        </Link>
        <Link id="aria-page-title" to="/posts/">
          Previous Post
        </Link>
      </nav>
    </header>
  );
};
