import { resolveNodeMeta } from '../Shared/lib/meta';
import { dedupeTags } from '../Shared/lib/nodes';
import { filterHasTag, filterNotPaths, newNode, sortCreated } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';

import { IndexTemplateRouteData } from './templates/Index/IndexTemplate.component';

const EXCLUDE_PATHS = ['/', '/tags', '/medias', '/feed'];

const featuredNodes = (nodes: Node[]): Node[] => {
  return nodes
    .filter(filterNotPaths(EXCLUDE_PATHS))
    .filter(filterHasTag('featured'))
    .sort(sortCreated)
    .splice(0, 20);
};

const latestNodes = (nodes: Node[]): Node[] => {
  return nodes
    .filter(filterNotPaths(EXCLUDE_PATHS))
    .sort(sortCreated)
    .splice(0, 20);
};

const updatedNodes = (nodes: Node[]): Node[] => {
  return [];
  // return nodes
  //   .filter(filterNotPaths(EXCLUDE_PATHS))
  //   .sort(sortUpdated)
  //   .splice(0, 20);
};

const feedPageRoute = (context: RouteContext, nodes: Node[]): Route => {
  const featured = featuredNodes(nodes);
  const latest = latestNodes(nodes);
  const updated = updatedNodes(nodes);

  const newLocal = {
    path: 'feed',
    template: 'Feed/Index'
  };
  const page = newNode('page', 'A Bit of Everything', newLocal) as PageNode;
  page.tags = dedupeTags([...featured, ...latest, ...updated].reduce((tags, node) => tags.concat(node.tags), []));

  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  return newRoute<IndexTemplateRouteData>(context, page, {
    page,
    featured: featuredNodes(nodes),
    latest: latestNodes(nodes),
    updated: updatedNodes(nodes)
  });
};

interface Data {
  nodes: Node[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const feedRoute = feedPageRoute(context, data.nodes);
  return [feedRoute];
};
