import * as React from 'react';

import './LinkToTop.scss';

export const LinkToTop: React.StatelessComponent<{}> = () => {
  return (
    <p className="link-to-top" role="navigation">
      <a className="link" href="#top" aria-label="back to the top of the page">
        &#8679;
      </a>
    </p>
  );
};
