import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import '../../../.storybook/index';
import * as styles from './Typography.module.scss';

const demo = () => {
  return (
    <section className={styles.section}>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
    </section>
  );
};

storiesOf('styles/Typography', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: true } })
  .add('basic', () => demo());
