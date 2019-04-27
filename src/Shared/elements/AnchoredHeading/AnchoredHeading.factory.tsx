import * as React from 'react';

import { slug } from '../../lib/strings';

import * as styles from './AnchoredHeading.module.scss';

const MAX_WORDS = 5;

const textOf = (children: React.ReactNode): string => {
  const flattened = React.Children.toArray(children);
  return flattened.reduce<string>((text, item) => {
    return text + item.toString();
  }, '');
};

const idOf = (children: React.ReactNode): string => {
  const slugged = slug(textOf(children));
  return slugged
    .split('-')
    .slice(0, MAX_WORDS)
    .join('-');
};

interface Props {
  children?: React.ReactNode;
}

export const anchoredHeading = (tag: React.ElementType): React.StatelessComponent<Props> => {
  const Tag = tag;
  return props => {
    const { children } = props;
    const id = idOf(children);
    return (
      <Tag className={styles.AnchoredHeading}>
        <a className={styles.handle} aria-hidden={true} href={`#${id}`} id={id} />
        {children}
      </Tag>
    );
  };
};
