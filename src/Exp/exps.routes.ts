import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { ExpNode } from './types/Exp.models';

import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

interface Data {
  exps: ExpNode[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const routes = data.exps.map(exp => {
    return newRoute<PageTemplateRouteData>(context, exp, {
      exp
    });
  });
  return routes;
};
