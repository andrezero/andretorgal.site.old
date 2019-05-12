import * as React from 'react';

import './MdChekbox.scss';

interface Props {
  type: string;
  [key: string]: any;
}

export const MdChekbox: React.StatelessComponent<Props> = props => {
  if (props.type === 'checkbox') {
    const classNames = ['md-checkbox'];
    if (props.checked) {
      classNames.push('is-checked');
    }
    return (
      <label className={classNames.join(' ')}>
        <input {...props} />
      </label>
    );
  }
  return <input {...props} />;
};
