import * as React from 'react';
import { Head } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { PageNode } from '../../../Shared/types/Page.models';
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
      <Head title={page.title} meta={page.meta.doc} />

      <section className="container">
        <h1 className="page-title">{page.title}</h1>

        <ul>
          {medias.map(media => (
            <li key={media.path}>
              <Link href={media.path}>
                {media.meta.asset.type}: {media.title}
              </Link>
              <p>{media.url}</p>
              <p>{media.meta.asset.url}</p>
              <p>{media.meta.asset.originalUrl}</p>
              <p>{media.meta.asset.alt}</p>
            </li>
          ))}
        </ul>

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface IndexTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<IndexTemplateRouteData>(IndexTemplate);

export default Container;
