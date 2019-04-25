import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import '../../../.storybook/index';

import AnchoredHeading from './AnchoredHeading.atom';

const Heading2 = AnchoredHeading('h2');
const Heading3 = AnchoredHeading('h3');
const Heading4 = AnchoredHeading('h4');

const spacer = (Component: React.ElementType, contents?: string) => {
  const style = { padding: '20px' };
  return (
    <div style={style}>
      <Component>{contents}</Component>
    </div>
  );
};

storiesOf('atoms/AnchoredHeading', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: true } })
  .add('empty', () => spacer(Heading2))
  .add('h2', () => spacer(Heading2, 'one anchored heading'))
  .add('h3', () => spacer(Heading3, 'another anchored heading'))
  .add('h4', () => spacer(Heading4, 'yet another anchored heading'))
  .add('long content', () => spacer(Heading4, 'anchor id truncated to 5 words'));
