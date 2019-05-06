import * as React from 'react';
import { Head } from 'react-static';

import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import './AboutTemplate.scss';

interface Props {
  page: ContentPage;
}

export const AboutTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="pages-about" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />

      <div className="container">
        <h1 className="page-title" aria-label={page.title}>
          {page.title}
        </h1>

        <MarkdownBasic>{page.content}</MarkdownBasic>

        <LinkToTop />
      </div>
    </Layout>
  );
};
