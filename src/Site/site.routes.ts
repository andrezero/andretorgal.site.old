import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route } from '../Shared/types/Route.models';

import { ErrorPageNode } from '../Shared/types/Page.models';

import { NotFoundTemplateRouteData } from './templates/NotFound/NotFoundTemplate.component';

export const buildRoutes = async (templates: TemplateLocator): Promise<Route[]> => {
  const defaults = {
    template: 'Site/NotFound',
    path: '/404'
  };
  const node = newNode('page', '404 - Not Found', defaults);
  const page = node as ErrorPageNode;
  page.error = 'not-found';

  const route = newRoute<NotFoundTemplateRouteData>(templates, page, { page });
  route.path = page.path;
  route.is404 = true;
  return [route];
};
