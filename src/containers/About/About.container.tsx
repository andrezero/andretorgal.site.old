import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './About.css';

import Markdown from 'atoms/Markdown/Markdown.component';
import LayoutContainer from 'layout/LayoutContainer/LayoutContainer.component';
import { PageRouteData } from 'types/Page.model';

export default function About() {
  const routeData: PageRouteData = useRouteData();
  const { page } = routeData;
  return (
    <LayoutContainer>
      <Head title={page.title} meta={page.meta} />
      <h1>{page.title}</h1>
      <Markdown text={page.content} />
    </LayoutContainer>
  );
}
