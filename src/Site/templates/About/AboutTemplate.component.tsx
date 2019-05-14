import * as React from 'react';
import { Head } from 'react-static';

import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { Hero } from '../../../Shared/blocks/Hero/Hero.component';
import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../elements/LinkToTop/LinkToTop.component';

import './AboutTemplate.scss';

interface Props {
  page: PageNode;
}

export const AboutTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="site-about" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />

      {page.hero && (
        <Hero img={page.hero.img}>
          <header className="hero-header">
            <NodeParent parent={page.links.parent} />
            <h1 className="page-title">{page.hero.title || page.title}</h1>
          </header>
          {page.abstract && <MarkdownBasic>{page.abstract}</MarkdownBasic>}
        </Hero>
      )}

      <section className="container">
        {!page.hero && (
          <>
            <NodeParent parent={page.links.parent} />
            <h1 className="page-title">{page.title}</h1>
          </>
        )}

        <MarkdownBasic>{page.content}</MarkdownBasic>

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface AboutTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<AboutTemplateRouteData>(AboutTemplate);

export default Container;
