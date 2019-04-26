import TemplateLocator from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { ContentPage, PageRoute, PageRouteData } from '../Shared/types/Page.model';

const pageRoute = (templates: TemplateLocator, page: ContentPage): PageRoute => {
  const template = page.template || 'Pages/Page';
  const className = page.className || cssClass(template);
  return {
    path: page.path,
    template: templates.locate(template),
    getData: (): PageRouteData => ({
      className,
      page
    })
  };
};

interface Data {
  pages: ContentPage[];
}

const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<PageRoute[]> => {
  return data.pages.map(page => pageRoute(templates, page));
};

export default buildRoutes;
