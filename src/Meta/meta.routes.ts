import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { cssClass } from '../Shared/lib/strings';
import { Route } from '../Shared/types/Route.models';

import { MetaNode } from './types/Meta.models';

import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const metaRoute = (templates: TemplateLocator, meta: MetaNode): Route => {
  const template = meta.template || 'Meta/Page';
  const className = meta.className || cssClass(template);
  return {
    path: meta.path,
    template: templates.locate(template),
    getData: (): PageTemplateRouteData => ({
      className,
      meta
    })
  };
};

interface Data {
  metas: MetaNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  return data.metas.map(meta => metaRoute(templates, meta));
};
