import * as React from 'react';

import { Head } from '../../../Shared/elements/Head/Head.component';
import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { PostDetail } from '../../groups/PostDetail/PostDetail.component';
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
      <Head node={post} />

      <section className="container">
        <PostDetail post={post} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface PostTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<PostTemplateRouteData>(PostTemplate);

export default Container;
