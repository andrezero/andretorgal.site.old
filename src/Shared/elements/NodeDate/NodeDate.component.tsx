import * as React from 'react';

import { FormattedDate } from '../FormattedDate/FormattedDate.component';

import './NodeDate.scss';

interface Props {
  date: Date | string;
}

export const NodeDate: React.StatelessComponent<Props> = ({ date }) => {
  return <FormattedDate date={date} className="node-date" />;
};
