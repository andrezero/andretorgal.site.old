import TemplateLocator from '../Shared/lib/classes/TemplateLocator';
import { ErrorPage, PageRoute } from '../Shared/types/Page.model';

const buildRoutes = async (templates: TemplateLocator): Promise<PageRoute[]> => {
  const page: ErrorPage = {
    title: '404 - Not Found'
  };
  return [
    {
      is404: true,
      path: '404',
      template: templates.locate('Site/ErrorNotFound'),
      getData: () => ({
        className: 'error',
        page
      })
    }
  ];
};

export default buildRoutes;
