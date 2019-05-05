import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import './SiteNav.scss';

interface Props {
  page: ContentPage;
}

export const SiteNav: React.StatelessComponent<Props> = ({ page }) => {
  return (
    <nav className="site-nav" role="navigation" aria-label="Main sections of the site">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts/">Posts</Link>
        </li>
        <li>
          <Link to="/docs/">Experiments</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/about/#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
