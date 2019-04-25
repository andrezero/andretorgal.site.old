import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import './About.css';

import Markdown from '../../atoms/Markdown/Markdown.atom';
import DefaultLayout from '../../layout/DefaultLayout/DefaultLayout.component';
import { ContentPage, PageRouteData } from '../../types/Page.model';

const AboutContainer: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  const page = routeData.page as ContentPage;
  return (
    <DefaultLayout>
      <Head title={page.title} meta={page.meta} />
      <h1>{page.title}</h1>
      <Markdown text={page.content.source} />
    </DefaultLayout>
  );
};

export default AboutContainer;
