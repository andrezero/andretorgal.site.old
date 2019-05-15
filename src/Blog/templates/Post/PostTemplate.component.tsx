import * as React from 'react';
import { Head } from 'react-static';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { PostAbstract } from '../../elements/PostAbstract/PostAbstract.component';
import { PostContents } from '../../elements/PostContents/PostContents.component';

import { PostNode } from '../../types/Post.models';

import './PostTemplate.scss';

export interface Props {
  post: PostNode;
}

export const PostTemplate: React.StatelessComponent<Props> = ({ post }) => {
  const header = <SiteHeader node={post} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="blog-post" header={header} footer={footer}>
      <Head title={post.title} meta={post.meta.doc} />

      <section className="container">
        <article className="post-item">
          <header>
            <NodeDate date={post.created} />
            <h1 className="page-title">{post.title}</h1>
          </header>
          <PostAbstract>{post.abstract}</PostAbstract>
          <PostContents>{post.content}</PostContents>
        </article>

        <footer>
          <NodeMeta node={post} />
        </footer>
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PostTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PostTemplateRouteData>(PostTemplate);

export default Container;
