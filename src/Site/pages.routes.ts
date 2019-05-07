import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { PageNode, PageRoute, PageRouteData } from '../Shared/types/Page.models';

const pageRoute = (templates: TemplateLocator, page: PageNode): PageRoute => {
  const template = page.template || 'Site/Page';
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
  pages: PageNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<PageRoute[]> => {
  return data.pages.map(page => pageRoute(templates, page));
};
