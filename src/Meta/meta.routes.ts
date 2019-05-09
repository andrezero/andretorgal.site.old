import path from 'path';

import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { PageNode, PageRoute, PageRouteData } from '../Shared/types/Page.models';

const metaRoute = (templates: TemplateLocator, meta: PageNode): PageRoute => {
  const template = meta.template || 'Meta/Page';
  const className = meta.className || cssClass(template);
  return {
    path: path.join('meta', meta.path),
    template: templates.locate(template),
    getData: (): PageRouteData => ({
      className,
      page: meta
    })
  };
};

interface Data {
  metas: PageNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<PageRoute[]> => {
  return data.metas.map(meta => metaRoute(templates, meta));
};
