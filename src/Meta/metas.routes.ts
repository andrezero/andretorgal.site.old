import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { MetaNode } from './types/Meta.models';

import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

interface Data {
  metas: MetaNode[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const routes = data.metas.map(meta => {
    return newRoute<PageTemplateRouteData>(context, meta, {
      meta
    });
  });
  return routes;
};
