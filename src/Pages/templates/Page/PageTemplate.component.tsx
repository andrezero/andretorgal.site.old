import * as React from 'react';
import { Head } from 'react-static';

import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';

import './PageTemplate.scss';

interface Props {
  page: ContentPage;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="pages-page" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />
      <h1 className="page-title" aria-label={page.title}>
        {page.title}
      </h1>
      <MarkdownBasic>{page.content}</MarkdownBasic>
    </Layout>
  );
};
