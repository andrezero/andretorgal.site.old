import * as React from 'react';

import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';
import { AutoScrollToTop } from '../../behaviours/AutoScrollToTop/AutoScrollToTop.component';
import { Anchor } from '../../elements/Anchor/Anchor.component';

import * as styles from './DefaultLayout.module.scss';

interface Props {
  className?: string;
  header: React.ReactNode;
  footer: React.ReactNode;
  children?: React.ReactNode;
}

export const DefaultLayout: React.StatelessComponent<Props> = ({ className, header, children, footer }) => {
  return (
    <AutoScrollToTop>
      <div className={`default-layout ${styles.DefaultLayout}`}>
        <Anchor id="top" />
        {header}
        <main className={`${className} layout-body ${styles.Body}`} role="main" id="page-contents">
          {children}
          <SROnly>
            <p className="to-top" role="navigation">
              <a className="link" href="#page-contents" aria-label="back to the top of the page">
                &#8679;
              </a>
            </p>
          </SROnly>
          <p className="to-top" role="navigation">
            <a className="link" href="#page-contents" aria-label="back to the top of the site">
              &#8679;
            </a>
          </p>
        </main>
        {footer}
      </div>
    </AutoScrollToTop>
  );
};
