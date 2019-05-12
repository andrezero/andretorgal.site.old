import dayjs from 'dayjs';
import * as React from 'react';

interface Props {
  date: Date | string;
  className?: string;
}

export const FormattedDate: React.StatelessComponent<Props> = ({ date, className = 'date' }) => {
  // const dt = typeof date === 'string' ? new Date(date) : date;
  const dt = dayjs(date);
  return (
    <time className={className} dateTime={dt.toISOString()}>
      {dt.format('MMM D, YYYY')}
    </time>
  );
};
