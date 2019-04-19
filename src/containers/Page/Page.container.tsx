import { Link } from '@reach/router';
import * as React from 'react';
import { useRouteData } from 'react-static';

import './Page.css';

export default function Page() {
  const { page } = (useRouteData as any)();
  return (
    <div>
      <h3>{page.title}</h3>
      <p>{page.content}</p>
    </div>
  );
}
