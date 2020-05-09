import * as React from 'react';

import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { ExpDetail } from '../../groups/ExpDetail/ExpDetail.component';
import { ExpNode } from '../../types/Exp.models';

import './PageTemplate.scss';

interface Props {
  exp: ExpNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ exp }) => {
  const header = <SiteHeader node={exp} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="exp-page" header={header} footer={footer}>
      <Head node={exp} />

      <section className="container">
        <ExpDetail exp={exp} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
