import * as React from 'react';

import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { newNode } from '../../../Shared/lib/nodes';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';

import './NotFoundTemplate.scss';

// interface Props {
//   page: ContentPage;
// }

export type NotFoundTemplateRouteData = RouteData;

export const NotFoundTemplate: React.StatelessComponent<{}> = () => {
  const props = {
    page: newNode('page', '404 - Not Found', { template: 'Site/NotFound' })
  };
  const header = <SiteHeader node={props.page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="error-not-found" header={header} footer={footer}>
      <Head node={props.page} />

      <section className="container">
        <h1 className="page-title">{props.page.title}</h1>
      </section>
    </Layout>
  );
};

const Container = templateContainer<NotFoundTemplateRouteData>(NotFoundTemplate);

export default Container;
