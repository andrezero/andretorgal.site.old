import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { MediaCard } from '../../blocks/MediaCard/MediaCard.component';
import { MediaNode } from '../../types/Media.models';

import './IndexTemplate.scss';

interface Props {
  medias: MediaNode[];
  page: PageNode;
}

export const IndexTemplate: React.StatelessComponent<Props> = ({ page, medias }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="media-index" header={header} footer={footer}>
      <Head node={page} />

      <section className="container">
        <h1 className="page-title">{page.title}</h1>

        <ul className="media-list">
          {medias.map(media => (
            <MediaCard key={media.path} node={media} footer={<NodeMeta node={media} />} />
          ))}
        </ul>
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface IndexTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<IndexTemplateRouteData>(IndexTemplate);

export default Container;
