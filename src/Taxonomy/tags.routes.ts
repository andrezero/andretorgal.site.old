import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';

import { makeMeta } from '../Shared/lib/meta';
import { cssClass } from '../Shared/lib/strings';
import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { TagTemplateRouteData } from './templates/Tag/TagTemplate.component';
import { TagsTemplateRouteData } from './templates/Tags/TagsTemplate.component';

import { TagNode } from './types/Tag.models';

const tagRoute = (templates: TemplateLocator, tag: TagNode, nodes: Node[]): Route => {
  const template = tag.template || 'Taxonomy/Tag';
  const className = tag.className || cssClass(template);
  return {
    path: tag.path,
    template: templates.locate(template),
    getData: (): TagTemplateRouteData => ({
      className,
      tag,
      nodes
    })
  };
};

const tagListPage = (): PageNode => {
  return {
    type: 'page',
    title: 'All tags',
    path: '/tags',
    created: new Date(),
    updated: new Date(),
    meta: makeMeta()
  };
};

const tagListPageRoute = (templates: TemplateLocator, tags: TagNode[]): Route => {
  const page = tagListPage();
  return {
    path: page.path,
    template: templates.locate('Taxonomy/Tags'),
    getData: (): TagsTemplateRouteData => ({
      className: 'taxonomy-tags',
      tags,
      page
    })
  };
};

interface Data {
  tags: TagNode[];
  nodes: Node[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const pageRoute = tagListPageRoute(templates, data.tags);
  const tagRoutes = data.tags.map(tag => {
    const taggedNodes = data.nodes.filter(node => node.tags && node.tags.indexOf(tag.name) !== -1);
    return tagRoute(templates, tag, taggedNodes);
  });
  const routes = [pageRoute, ...tagRoutes];
  return routes;
};
