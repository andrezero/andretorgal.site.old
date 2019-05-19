import * as React from 'react';
import { Head } from 'react-static';

import { Hero } from '../../../Shared/blocks/Hero/Hero.component';
import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { ResponsiveSrc } from '../../../Shared/elements/ResponsiveImg/ResponsiveImg.component';
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
  const img: ResponsiveSrc = {
    set: [['1024w', hero.img], ['2048w', hero.img]],
    sizes: ['100vw']
  };

  return (
    <Hero img={img}>
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
      <Head title={page.title} meta={page.meta.doc} />

      {hero && renderHero(page)}

      <section className="container">
        {!hero && renderHeader(page)}

        <NodeMarkdown node={page}>{page.content}</NodeMarkdown>

        <LinkToTop />
      </section>
    </Layout>
  );
};

const Container = templateContainer<PageTemplateRouteData>(AboutTemplate);

export default Container;
