import * as React from 'react';

import './StagingBanner.scss';

interface Props {
  href: string;
}

export const StagingBanner: React.StatelessComponent<Props> = ({ href }) => {
  return (
    <div id="staging-banner" role="banner" style={{ opacity: 0 }}>
      <h1>Staging</h1>
      <p className="reader-only">You are reading the staging version of this page.</p>
      <p className="reader-only">Follow the next link to jump to the production site.</p>
      <a title="production site" href={href}>
        go to <strong>andretorgal.com</strong>
      </a>
    </div>
  );
};
