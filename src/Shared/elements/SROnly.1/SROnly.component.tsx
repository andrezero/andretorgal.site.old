import * as React from 'react';

import './SROnly.scss';

interface Props {
  children?: React.ReactNode;
}

// @todo rename to <ReaderOnly>
export const SROnly: React.StatelessComponent<Props> = ({ children }) => {
  return <div className="reader-only">{children}</div>;
};
