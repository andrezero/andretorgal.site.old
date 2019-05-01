import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';

import { DocContents } from '../../elements/DocContents/DocContents.component';

interface Props {
  page: ContentPage;
}

export const IndexTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="docs-index" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />
      <h1>{page.title}</h1>
      <DocContents>{page.content}</DocContents>
    </Layout>
  );
};
