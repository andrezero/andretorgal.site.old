import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { newRoute } from '../Shared/lib/routes';
import { Route } from '../Shared/types/Route.models';

import { MetaNode } from './types/Meta.models';

import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

interface Data {
  metas: MetaNode[];
}

export const buildRoutes = async (stage: string, templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const routes = data.metas.map(meta => {
    return newRoute<PageTemplateRouteData>(templates, meta, {
      meta
    });
  });
  return routes;
};
