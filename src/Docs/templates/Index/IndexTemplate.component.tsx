import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage, PageRouteData } from '../../../Shared/types/Page.model';

import { DocContents } from '../../elements/DocContents/DocContents.component';

interface Props {
  page: ContentPage;
}

export const IndexTemplate: React.StatelessComponent<Props> = props => {
  return (
    <Layout>
      <Head title={props.page.title} meta={props.page.meta} />
      <h1>{props.page.title}</h1>
      <DocContents content={props.page.content} />
    </Layout>
  );
};
