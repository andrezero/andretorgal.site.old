import * as React from 'react';

import * as styles from './Anchor.module.scss';

interface Props {
  id: string;
}

export const Anchor: React.StatelessComponent<Props> = ({ id }) => {
  return <a className={styles.Anchor} id={id} aria-hidden={true} />;
};
