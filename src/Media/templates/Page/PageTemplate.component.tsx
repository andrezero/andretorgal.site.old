import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { MediaNode } from '../../types/Media.models';

import './PageTemplate.scss';

interface Props {
  media: MediaNode;
}

export const PageTemplate: React.StatelessComponent<Props> = ({ media }) => {
  const header = <SiteHeader node={media} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="media-page" header={header} footer={footer}>
      <Head title={media.title} meta={media.meta.doc} />

      <section className="container">
        <h1 className="page-title">{media.title}</h1>

        {media.meta.asset.url}

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
