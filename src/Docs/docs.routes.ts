import path from 'path';

import TemplateLocator from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { ContentPage, PageRoute, PageRouteData } from '../Shared/types/Page.model';

const docRoute = (templates: TemplateLocator, doc: ContentPage): PageRoute => {
  const template = doc.template || 'Pages/Page';
  const className = doc.className || cssClass(template);
  return {
    path: path.join('docs', doc.path),
    template: templates.locate(template),
    getData: (): PageRouteData => ({
      className,
      page: doc
    })
  };
};

interface Data {
  docs: ContentPage[];
}

const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<PageRoute[]> => {
  return data.docs.map(doc => docRoute(templates, doc));
};

export default buildRoutes;
