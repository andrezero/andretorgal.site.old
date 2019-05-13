import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { Node } from '../../../Shared/types/Node.models';
import { PageNode } from '../../../Shared/types/Page.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { TagList } from '../../groups/TagList/TagList.component';
import { TagNode } from '../../types/Tag.models';

import './TagsTemplate.scss';

interface Props {
  page: PageNode;
  tags: TagNode[];
}

export const TagsTemplate: React.StatelessComponent<Props> = ({ page, tags }) => {
  const header = <SiteHeader page={page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="taxonomy-tags" header={header} footer={footer}>
      <Head title={page.title} meta={page.meta} />

      <section className="container">
        <h1 className="page-title">{page.title}</h1>

        <TagList tags={tags} />

        <LinkToTop />
      </section>
    </Layout>
  );
};

export interface TagsTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<TagsTemplateRouteData>(TagsTemplate);

export default Container;
