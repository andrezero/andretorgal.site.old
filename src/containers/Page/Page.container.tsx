import * as React from 'react';
import { useRouteData } from 'react-static';

import './Page.css';

import Markdown from 'atoms/Markdown/Markdown.component';
import LayoutContainer from 'layout/LayoutContainer/LayoutContainer.component';

export default function Page() {
  const { page } = (useRouteData as any)();
  return (
    <LayoutContainer>
      <h1>{page.title}</h1>
      <Markdown text={page.content} />
    </LayoutContainer>
  );
}
