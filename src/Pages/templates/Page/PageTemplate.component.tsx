import * as React from 'react';
import { Head } from 'react-static';

import Markdown from '../../../Shared/elements/Markdown/Markdown.component';
import DefaultLayout from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

interface Props {
  page: ContentPage;
}

export const PageTemplate: React.StatelessComponent<Props> = props => {
  return (
    <DefaultLayout>
      <Head title={props.page.title} meta={props.page.meta} />
      <h1>{props.page.title}</h1>
      <Markdown text={props.page.content.source} />
    </DefaultLayout>
  );
};
