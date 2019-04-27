import * as React from 'react';
import { Head } from 'react-static';

import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

interface Props {
  page: ContentPage;
}

export const AboutTemplate: React.StatelessComponent<Props> = props => {
  return (
    <Layout>
      <Head title={props.page.title} meta={props.page.meta} />
      <h1>{props.page.title}</h1>
      <MarkdownBasic text={props.page.content.source} />
    </Layout>
  );
};
