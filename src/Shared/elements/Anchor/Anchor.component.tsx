import * as React from 'react';

import './Anchor.scss';

interface Props {
  id: string;
}

export const Anchor: React.StatelessComponent<Props> = ({ id }) => {
  return <a className="anchor" id={id} aria-hidden={true} />;
};
