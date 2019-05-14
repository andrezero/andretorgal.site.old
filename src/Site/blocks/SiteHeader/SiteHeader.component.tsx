import * as React from 'react';
import { useSiteData } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';
import { Node } from '../../../Shared/types/Node.models';

import { SiteNav } from '../SiteNav/SiteNav.component';

import './SiteHeader.scss';

interface Props {
  node: Node;
}

export const SiteHeader: React.StatelessComponent<Props> = ({ node }) => {
  const site = useSiteData();
  return (
    <header className="site-header" role="banner" aria-label="site header">
      <div className="container">
        <h1 className="site-title">
          <Link href="/">{site.title}</Link>
        </h1>
        <SROnly>
          <p>{`You are on page: ${node.title}.`}</p>
          <Link tabIndex={-1} href="#page-contents">
            skip to page contents
          </Link>
        </SROnly>
        <SiteNav page={node} />
      </div>
      <hr />
    </header>
  );
};
