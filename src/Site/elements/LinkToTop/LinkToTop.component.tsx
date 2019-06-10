import * as React from 'react';
import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';

import './LinkToTop.scss';

const onClick = (ev: React.MouseEvent) => {
  window.scrollTo({ top: 0 });
  ev.preventDefault();
};

export const LinkToTop: React.StatelessComponent<{}> = () => {
  return (
    <p className="link-to-top" role="navigation">
      <a className="link" href="#top" aria-label="back to the top of the page" onClick={onClick}>
        <SROnly>To the top</SROnly>
      </a>
    </p>
  );
};
