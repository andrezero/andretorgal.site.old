import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { ErrorPageNode, PageRoute } from '../Shared/types/Page.models';

export const buildRoutes = async (templates: TemplateLocator): Promise<PageRoute[]> => {
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
      getData: () => ({
        className: 'error',
        page
      })
    }
  ];
};
