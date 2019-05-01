import * as React from 'react';

import * as styles from './SROnly.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const SROnly: React.StatelessComponent<Props> = ({ children }) => {
  return <div className={styles.Module}>{children}</div>;
};
