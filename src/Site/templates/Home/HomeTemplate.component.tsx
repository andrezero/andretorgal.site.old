import * as React from 'react';
import { Head } from 'react-static';

import { Hero } from '../../../Shared/blocks/Hero/Hero.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../elements/LinkToTop/LinkToTop.component';

import { PostList } from '../../../Blog/groups/PostList/PostList.component';
import { PostNode } from '../../../Blog/types/Post.models';

import { ResponsiveSrc, SrcSetItem } from '../../../Shared/elements/ResponsiveImg/ResponsiveImg.component';
import './HomeTemplate.scss';

interface Props {
  page: PageNode;
  posts: PostNode[];
}

export const HomeTemplate: React.StatelessComponent<Props> = ({ page, posts }) => {
  const header = <SiteHeader node={page} />;
  const footer = <SiteFooter />;

  const img: ResponsiveSrc = {
    set: [['1024w', '/assets/imgs/home-hero-sm.jpg'], ['2048w', '/assets/imgs/home-hero.jpg']],
    sizes: ['100vw']
  };
  return (
    <Layout className="site-home" header={header} footer={footer}>
      <Head title="Recent posts" meta={page.meta} />
      <Hero img={img}>
        <header className="hero-header">
          <h1 className="page-title">Welcome friend</h1>
        </header>
        <MarkdownBasic>{page.abstract}</MarkdownBasic>
      </Hero>

      <section className="container">
        <h2 className="page-title">Latest Posts</h2>

        <PostList posts={posts} level={3} />

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface HomeTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<HomeTemplateRouteData>(HomeTemplate);

export default Container;
