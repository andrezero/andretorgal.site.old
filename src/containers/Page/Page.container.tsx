import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './Page.css';

import Markdown from 'atoms/Markdown/Markdown.component';
import DefaultLayout from 'layout/DefaultLayout/DefaultLayout.component';
import { PageRouteData } from 'types/Page.model';

const PageContainer: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  const { page } = routeData;
  return (
    <DefaultLayout>
      <Head title={page.title} meta={page.meta} />
      <h1>{page.title}</h1>
      <Markdown text={page.content.source} />
    </DefaultLayout>
  );
};

export default PageContainer;
