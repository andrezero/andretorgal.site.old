import * as React from 'react';

import { SROnly } from '../../../Shared/elements/SROnly/SROnly.component';

import './TagCount.scss';

interface Props {
  count: number;
}

export const TagCount: React.StatelessComponent<Props> = ({ count }) => {
  const tagCount = count > 1 ? `Used in ${count} items` : `Used in ${count} item`;
  return (
    <>
      <SROnly>{tagCount}</SROnly>
      <div aria-hidden={true} className="tag-count">
        {count}
      </div>
    </>
  );
};
