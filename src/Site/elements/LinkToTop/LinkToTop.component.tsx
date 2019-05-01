import * as React from 'react';

import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';

import * as styles from './LinkToTop.module.scss';

export const LinkToTop: React.StatelessComponent<{}> = () => {
  return (
    <p className={`to-top ${styles.Module}`} role="navigation">
      <a className="link" href="#page-contents" aria-label="back to the top of the site">
        &#8679;
      </a>
    </p>
  );
};
