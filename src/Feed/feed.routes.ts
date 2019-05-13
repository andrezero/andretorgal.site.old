import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { makeMeta } from '../Shared/lib/meta';
import { filterHasTag, filterNoRoot, sortCreated, sortUpdated } from '../Shared/lib/nodes';
import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { IndexTemplateRouteData } from './templates/Index/IndexTemplate.component';

const featuredNodes = (nodes: Node[]): Node[] => {
  return nodes
    .filter(filterNoRoot)
    .filter(filterHasTag('featured'))
    .sort(sortCreated)
    .splice(0, 20);
};

const latestNodes = (nodes: Node[]): Node[] => {
  return nodes
    .filter(filterNoRoot)
    .sort(sortCreated)
    .splice(0, 20);
};

const updatedNodes = (nodes: Node[]): Node[] => {
  return nodes
    .filter(filterNoRoot)
    .sort(sortUpdated)
    .splice(0, 20);
};

const feedPage = (templates: TemplateLocator): PageNode => {
  return {
    type: 'page',
    title: 'A Bit of Everything',
    path: '/feed',
    created: new Date(),
    updated: new Date(),
    meta: makeMeta()
  };
};

const feedPageRoute = (templates: TemplateLocator, nodes: Node[]): Route => {
  const page = feedPage(templates);
  return {
    path: page.path,
    template: templates.locate('Feed/Index'),
    getData: (): IndexTemplateRouteData => ({
      className: 'feed',
      page,
      featured: featuredNodes(nodes),
      latest: latestNodes(nodes),
      updated: updatedNodes(nodes)
    })
  };
};

interface Data {
  nodes: Node[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const feedRoute = feedPageRoute(templates, data.nodes);
  return [feedRoute];
};
