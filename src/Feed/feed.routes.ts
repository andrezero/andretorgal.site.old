import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { filterHasTag, filterNoRoot, newNode, sortCreated, sortUpdated } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route } from '../Shared/types/Route.models';

import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';

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

const feedPageRoute = (templates: TemplateLocator, nodes: Node[]): Route => {
  const newLocal = {
    path: 'feed',
    template: 'Feed/Index'
  };
  const page = newNode('page', 'A Bit of Everything', newLocal) as PageNode;

  return newRoute<IndexTemplateRouteData>(templates, page, {
    page,
    featured: featuredNodes(nodes),
    latest: latestNodes(nodes),
    updated: updatedNodes(nodes)
  });
};

interface Data {
  nodes: Node[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const feedRoute = feedPageRoute(templates, data.nodes);
  return [feedRoute];
};
