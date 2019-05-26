import * as React from 'react';

import { Hero } from '../../../Shared/blocks/Hero/Hero.component';
import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { Head } from '../../../Shared/elements/Head/Head.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../elements/LinkToTop/LinkToTop.component';

import { PageTemplateProps as Props, PageTemplateRouteData } from '../Page/PageTemplate.component';

import './AboutTemplate.scss';

const renderHero = (page: PageNode) => {
  const { hero } = page.features;

  return (
    <Hero node={page} img={hero.img}>
      <header className="hero-header">
        <NodeParent parent={page.meta.links.parent} />
        <h1 className="page-title">{hero.title || page.title}</h1>
      </header>
      {page.abstract && <MarkdownBase>{page.abstract}</MarkdownBase>}
    </Hero>
  );
};

const renderHeader = (page: PageNode) => {
  return (
    <>
      <NodeParent parent={page.meta.links.parent} />
      <h1 className="page-title">{page.title}</h1>
    </>
  );
};

export const AboutTemplate: React.StatelessComponent<Props> = ({ page }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;
  const { hero } = page.features;
  return (
    <Layout className="site-about" header={header} footer={footer}>
      <Head node={page} />

      {hero && renderHero(page)}

      <section className="container">
        {!hero && renderHeader(page)}

        <NodeMarkdown node={page}>{page.content}</NodeMarkdown>
      </section>

      <LinkToTop />
    </Layout>
  );
};

const Container = templateContainer<PageTemplateRouteData>(AboutTemplate);

export default Container;
