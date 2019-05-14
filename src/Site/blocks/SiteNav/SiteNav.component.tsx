import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { Node } from '../../../Shared/types/Node.models';

import './SiteNav.scss';

interface Props {
  page: Node;
}

export const SiteNav: React.StatelessComponent<Props> = ({ page }) => {
  return (
    <nav className="site-nav" role="navigation" aria-label="Main sections of the site">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts/">Blog</Link>
        </li>
        {/* <li>
          <Link href="/things/">Things</Link>
        </li>
        <li>
          <Link href="/mentions/">Mentions</Link>
        </li> */}
        <li>
          <Link href="/feed/">Feed</Link>
        </li>
        {/* <li>
          <Link href="/experiments/">Experiments</Link>
        </li> */}
        <li>
          <Link href="/about/">About</Link>
        </li>
        <li>
          <Link href="/meta/">Meta</Link>
        </li>
        <li>
          <Link href="/about/#see-you-around">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
