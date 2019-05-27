import * as React from 'react';

import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { MetaDetail } from '../../groups/MetaDetail/MetaDetail.component';
import { MetaNode } from '../../types/Meta.models';

import './PageTemplate.scss';

interface Props {
  meta: MetaNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ meta }) => {
  const header = <SiteHeader node={meta} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="meta-page" header={header} footer={footer}>
      <Head node={meta} />

      <section className="container">
        <NodeParent parent={meta.meta.links.parent} />

        <MetaDetail meta={meta} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
