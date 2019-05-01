import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import * as styles from './SiteFooterNav.module.scss';

export const SiteFooterNav: React.StatelessComponent<{}> = () => {
  return (
    <nav className={`navigation ${styles.Module}`} role="navigation" aria-label="Main sections of the site">
      <ul className="nav-items">
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
