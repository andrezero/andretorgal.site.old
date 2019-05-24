import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { metaKeywords } from '../Shared/lib/meta';
import { dedupeTags } from '../Shared/lib/nodes';
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
  const featured = featuredNodes(nodes);
  const latest = latestNodes(nodes);
  const updated = updatedNodes(nodes);

  const newLocal = {
    path: 'feed',
    template: 'Feed/Index'
  };
  const page = newNode('page', 'A Bit of Everything', newLocal) as PageNode;
  page.tags = dedupeTags([...featured, ...latest, ...updated].reduce((t, node) => t.concat(node.tags), []));
  metaKeywords(page);

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

export const buildRoutes = async (stage: string, templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const feedRoute = feedPageRoute(templates, data.nodes);
  return [feedRoute];
};
