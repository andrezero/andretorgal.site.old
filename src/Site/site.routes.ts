import { resolveNodeMeta } from '../Shared/lib/meta';
import { newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { ErrorPageNode } from '../Shared/types/Page.models';

import { NotFoundTemplateRouteData } from './templates/NotFound/NotFoundTemplate.component';

export const buildRoutes = async (context: RouteContext): Promise<Route[]> => {
  const defaults = {
    template: 'Site/NotFound',
    path: '/404'
  };
  const page = newNode('page', '404 - Not Found', defaults) as ErrorPageNode;
  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  page.error = 'not-found';

  const route = newRoute<NotFoundTemplateRouteData>(context, page, { page });
  route.path = page.path;
  route.is404 = true;
  return [route];
};
