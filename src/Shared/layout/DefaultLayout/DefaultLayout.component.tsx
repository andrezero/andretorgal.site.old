import * as React from 'react';

import { AcessibleRouting } from '../../behaviours/AcessibleRouting/AcessibleRouting.component';

import './DefaultLayout.scss';

interface Props {
  className?: string;
  header: React.ReactNode;
  footer: React.ReactNode;
  children?: React.ReactNode;
}

export const DefaultLayout: React.StatelessComponent<Props> = ({ className, header, children, footer }) => {
  return (
    <AcessibleRouting focus="top">
      <div className={`layout default-layout`} id="top">
        {header}
        <main id="page-contents" className={`${className} layout-body`} role="main">
          {children}
        </main>
        {footer}
      </div>
    </AcessibleRouting>
  );
};
