import * as React from 'react';
import { Head } from 'react-static';

import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { PostList } from '../../../Blog/groups/PostList/PostList.component';
import { PostNode } from '../../../Blog/types/Post.models';

import './HomeTemplate.scss';

interface Props {
  page: PageNode;
  posts: PostNode[];
}

export const HomeTemplate: React.StatelessComponent<Props> = ({ page, posts }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="site-home" header={header} footer={footer}>
      <Head title="Recent posts" meta={page.meta} />
      <section className="hero">
        <h1 className="page-title">{page.title}</h1>

        <MarkdownBasic>{page.content}</MarkdownBasic>
      </section>

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
