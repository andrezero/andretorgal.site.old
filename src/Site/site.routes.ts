import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { ErrorPageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { NotFoundTemplateRouteData } from './templates/NotFound/NotFoundTemplate.component';

export const buildRoutes = async (templates: TemplateLocator): Promise<Route[]> => {
  const page: ErrorPageNode = {
    type: 'page',
    title: '404 - Not Found',
    error: 'not-found'
  };
  return [
    {
      is404: true,
      path: '404',
      template: templates.locate('Site/NotFound'),
      getData: (): NotFoundTemplateRouteData => ({
        className: 'error',
        page
      })
    }
  ];
};
