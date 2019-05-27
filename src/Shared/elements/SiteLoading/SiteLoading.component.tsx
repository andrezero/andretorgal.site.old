import * as React from 'react';

import './SiteLoading.scss';

export const SiteLoading: React.StatelessComponent<{}> = () => {
  return (
    <div className="site-loading" style={{ opacity: 0, transition: 'opacity 1s ease' }}>
      <label>Loading...</label>
    </div>
  );
};
