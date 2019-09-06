import * as React from 'react';

import './SROnly.scss';

interface Props {
  children?: React.ReactNode;
  inline?: boolean;
}

// @todo rename to <ReaderOnly>
export const SROnly: React.StatelessComponent<Props> = ({ children, inline }) => {
  const Tag = inline ? 'span' : 'p';
  return <Tag className="reader-only">{children}</Tag>;
};
