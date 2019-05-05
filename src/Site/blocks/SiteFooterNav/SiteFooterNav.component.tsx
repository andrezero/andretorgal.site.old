import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import './SiteFooterNav.scss';

export const SiteFooterNav: React.StatelessComponent<{}> = () => {
  return (
    <nav className="site-footer-nav" role="navigation" aria-label="Main sections of the site">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts/">Posts</Link>
        </li>
        <li>
          <Link href="/experiments/">Experiments</Link>
        </li>
        <li>
          <Link href="/about/">About</Link>
        </li>
      </ul>
    </nav>
  );
};
