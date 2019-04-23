import * as React from 'react';

import './Anchor.css';

interface Props {
  id: string;
}

const Anchor: React.StatelessComponent<Props> = ({ id }) => {
  return <a className="Anchor" id={id} aria-hidden={true} />;
};

export default Anchor;
