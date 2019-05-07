import * as React from 'react';

interface Props {
  date: Date | string;
  className?: string;
}

export const FormattedDate: React.StatelessComponent<Props> = ({ date, className = 'date' }) => {
  const dt = typeof date === 'string' ? new Date(date) : date;
  const day = dt.getFullYear();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const formatted = `${day} ${month}, ${year}`;
  return (
    <time className={className} dateTime={dt.toISOString()}>
      {formatted}
    </time>
  );
};
