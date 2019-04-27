import * as React from 'react';

import { AutoScrollToTop } from '../../behaviours/AutoScrollToTop/AutoScrollToTop.component';
import { Anchor } from '../../elements/Anchor/Anchor.component';
import { Link } from '../../elements/Link/Link.component';

import * as styles from './DefaultLayout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const DefaultLayout: React.StatelessComponent<Props> = ({ className, children }) => {
  return (
    <AutoScrollToTop>
      <div className={`${styles.DefaultLayout} ${className || ''}`}>
        <Anchor id="page-contents" />
        <main className="layout-body" role="main">
          <Anchor id="top" />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/posts">Blog</Link>
            <Link to="/docs">Docs</Link>
          </nav>
          {children}
          <p className="to-top" role="navigation">
            <a className="link" href="#page-contents" aria-label="back to the top of the page">
              &#8679;
            </a>
          </p>
        </main>
      </div>
    </AutoScrollToTop>
  );
};
