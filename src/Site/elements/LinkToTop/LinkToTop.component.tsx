import * as React from 'react';

import './LinkToTop.scss';

export const LinkToTop: React.StatelessComponent<{}> = () => {
  return (
    <p className="link-to-top" role="navigation">
      <a className="link" href="#page-contents" aria-label="back to the top of the site">
        &#8679;
      </a>
    </p>
  );
};
