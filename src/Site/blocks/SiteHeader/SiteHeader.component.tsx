import * as React from 'react';
import { useSiteData } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';
import { Node } from '../../../Shared/types/Node.models';

import { SiteNav } from '../SiteNav/SiteNav.component';

import './SiteHeader.scss';

interface Props {
  page: Node;
  children?: React.ReactNode;
}

export const SiteHeader: React.StatelessComponent<Props> = ({ page, children }) => {
  const site = useSiteData();
  return (
    <>
      <header className="site-header" role="banner" aria-label="site header">
        <div className="container">
          <h1 className="site-title">
            <Link to="/">{site.title}</Link>
          </h1>
          <SROnly>
            <p>{`You are on page: ${page.title}.`}</p>
            <Link href="#page-contents">skip to page contents</Link>
          </SROnly>
          <SiteNav page={page} />
        </div>
      </header>
      {children}
      <hr className="pedantic" />
    </>
  );
};
