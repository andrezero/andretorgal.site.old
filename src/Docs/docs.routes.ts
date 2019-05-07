import path from 'path';

import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { PageNode, PageRoute, PageRouteData } from '../Shared/types/Page.models';

const docRoute = (templates: TemplateLocator, doc: PageNode): PageRoute => {
  const template = doc.template || 'Docs/Page';
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
  docs: PageNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<PageRoute[]> => {
  return data.docs.map(doc => docRoute(templates, doc));
};
