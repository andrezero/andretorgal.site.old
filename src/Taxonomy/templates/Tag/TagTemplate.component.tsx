import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { templateContainer } from '../../../Shared/TemplateContainer';
import { Node } from '../../../Shared/types/Node.models';
import { RouteData } from '../../../Shared/types/Route.models';

import { SiteFooter } from '../../../Site/blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../../Site/blocks/SiteHeader/SiteHeader.component';
import { LinkToTop } from '../../../Site/elements/LinkToTop/LinkToTop.component';

import { NodeList } from '../../../Feed/groups/NodeList/NodeList.component';

import { TagItem } from '../../groups/TagItem/TagItem.component';
import { TagNode } from '../../types/Tag.models';

import './TagTemplate.scss';

export interface Props {
  tag: TagNode;
  nodes: Node[];
}

export const TagTemplate: React.StatelessComponent<Props> = ({ tag, nodes }) => {
  const header = <SiteHeader node={tag} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="taxonomy-tag" header={header} footer={footer}>
      <Head title={`#${tag.title}`} meta={tag.meta.doc} />

      <section className="container">
        <TagItem tag={tag} />
        <h2>All items under #{tag.title}</h2>
        <NodeList nodes={nodes} level={3} />
      </section>

      <LinkToTop />
    </Layout>
  );
};

export interface TagTemplateRouteData extends RouteData, Props {}

const Container = templateContainer<TagTemplateRouteData>(TagTemplate);

export default Container;
