import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { DocContents } from '../../elements/DocContents/DocContents.component';

interface Props {
  page: ContentPage;
}

export const PageTemplate: React.StatelessComponent<Props> = props => {
  return (
    <Layout>
      <Head title={props.page.title} meta={props.page.meta} />
      <h1>{props.page.title}</h1>
      <DocContents text={props.page.content.source} />
    </Layout>
  );
};
