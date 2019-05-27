import * as React from 'react';

import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { MediaDetail } from '../../groups/MediaDetail/MediaDetail.component';
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
      <Head node={media} />

      <section className="container">
        <MediaDetail media={media} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PageTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PageTemplateRouteData>(PageTemplate);

export default Container;
