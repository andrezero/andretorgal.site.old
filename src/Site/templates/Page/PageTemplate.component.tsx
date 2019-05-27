import * as React from 'react';

import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../elements/LinkToTop/LinkToTop.component';
import { PageDetail } from '../../groups/PageDetail/PageDetail.component';

import './PageTemplate.scss';

interface Props {
  page: PageNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="site-page" header={header} footer={footer}>
      <Head node={page} />

      <section className="container">
        <PageDetail page={page} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}
export interface PageTemplateProps extends Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
