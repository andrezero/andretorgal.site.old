import * as React from 'react';
import { useRouteData } from 'react-static';

import './Page.css';

import Markdown from 'atoms/Markdown/Markdown.component';

export default function Page() {
  const { page } = (useRouteData as any)();
  return (
    <div>
      <h3>{page.title}</h3>
      <Markdown text={page.content} />
    </div>
  );
}
