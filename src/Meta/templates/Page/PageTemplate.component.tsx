import * as React from 'react';
import { Head } from 'react-static';

import { NodeChildren } from '../../../Shared/blocks/NodeChildren/NodeChildren.component';
import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { MetaNode } from '../..//types/Meta.models';
import { MetaContents } from '../../elements/MetaContents/MetaContents.component';

import './PageTemplate.scss';

interface Props {
  meta: MetaNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ meta }) => {
  const header = <SiteHeader node={meta} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="meta-page" header={header} footer={footer}>
      <Head title={meta.title} meta={meta.meta.doc} />

      <section className="container">
        <NodeParent parent={meta.meta.links.parent} />
        <h1 className="page-title">{meta.title}</h1>
        <NodeMeta node={meta} showUpdated={true} />
        <MetaContents>{meta.abstract}</MetaContents>
        <NodeChildren children={meta.meta.links.children} />
        <MetaContents>{meta.content}</MetaContents>
        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
