import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';

import { SiteFooterContacts } from '../SiteFooterContacts/SiteFooterContacts.component';
import { SiteFooterNav } from '../SiteFooterNav/SiteFooterNav.component';

import * as styles from './SiteFooter.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const SiteFooter: React.StatelessComponent<Props> = ({ children }) => {
  return (
    <footer className={`site-footer ${styles.Module}`} role="contentinfo">
      <hr />
      {children}
      <div className={styles.Container}>
        <SROnly>
          <Link href="#page-contents">Go back to top of the page</Link>
        </SROnly>
        <SiteFooterNav />
        <SiteFooterContacts />
        <p className="copyright">
          <span className="name">andretorgal.com</span> <span className="version">v.0.0.1</span>{' '}
          <span className="year">Copyright © 2017</span> <Link href="/about">André Torgal</Link>
        </p>
        <p className="license">
          All code and content for this site available on{' '}
          <Link href="https://github.com/andrezero/site.git">Github</Link> under a{' '}
          <Link href="https://raw.githubusercontent.com/andrezero/site/master/LICENSE-MIT">MIT LICENSE</Link> unless
          otherwise noted.
        </p>
      </div>
    </footer>
  );
};
