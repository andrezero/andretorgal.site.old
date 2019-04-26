import * as React from 'react';

import Anchor from '../../atoms/Anchor/Anchor.atom';
import Link from '../../atoms/Link/Link.atom';
import AutoScrollToTop from '../../layout/AutoScrollToTop/AutoScrollToTop.component';

import * as styles from './DefaultLayout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const DefaultLayout: React.StatelessComponent<Props> = ({ className, children }) => {
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

export default DefaultLayout;
