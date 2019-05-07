import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { PageNode } from '../../../Shared/types/Page.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { DocContents } from '../../elements/DocContents/DocContents.component';

import './PageTemplate.scss';

interface Props {
  page: PageNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="docs-page" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />

      <section className="container">
        <h1 className="page-title">{page.title}</h1>

        <DocContents>{page.content}</DocContents>

        <LinkToTop />
      </section>
    </Layout>
  );
};
