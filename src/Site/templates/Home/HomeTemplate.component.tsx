import * as React from 'react';

import { Hero } from '../../../Shared/blocks/Hero/Hero.component';
import { Head } from '../../../Shared/elements/Head/Head.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../elements/LinkToTop/LinkToTop.component';

import { PostList } from '../../../Blog/groups/PostList/PostList.component';
import { PostNode } from '../../../Blog/types/Post.models';

import './HomeTemplate.scss';

interface Props {
  page: PageNode;
  posts: PostNode[];
}

const renderHero = (page: PageNode) => {
  const { hero } = page.features;

  return (
    <Hero node={page} img={hero.img}>
      <header className="hero-header">
        <h1 className="page-title">{page.title}</h1>
      </header>
      <NodeMarkdown node={page}>{page.abstract}</NodeMarkdown>
    </Hero>
  );
};

export const HomeTemplate: React.StatelessComponent<Props> = ({ page, posts }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;

  return (
    <Layout className="site-home" header={header} footer={footer}>
      <Head node={page} />

      {renderHero(page)}

      <section className="container">
        <h2 className="page-title">{page.title}</h2>

        <PostList posts={posts} level={3} />

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface HomeTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<HomeTemplateRouteData>(HomeTemplate);

export default Container;
