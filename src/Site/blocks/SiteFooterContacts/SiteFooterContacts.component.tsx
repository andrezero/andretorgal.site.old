import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';

import './SiteFooterContacts.scss';

export const SiteFooterContacts: React.StatelessComponent<{}> = () => {
  return (
    <nav className="site-footer-contacts" aria-label="you can find me elsewhere at">
      <ul className="nav-extenral">
        <li>
          <Link className="github" href="https://github.com/andrezero">
            Github
          </Link>
        </li>
        <li>
          <Link className="twitter" href="https://twitter.com/andrezero">
            Twitter
          </Link>
        </li>
        <li>
          <Link className="facebook" href="https://facebook.com/andrezero">
            Facebook
          </Link>
        </li>
        <li>
          <Link className="linkedin" href="https://linkedin.com/in/andretorgal">
            LinkedIn
          </Link>
        </li>
      </ul>
    </nav>
  );
};
