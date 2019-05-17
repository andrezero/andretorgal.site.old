import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route } from '../Shared/types/Route.models';

import { PageNode } from '../Shared/types/Page.models';
import { MediaNode } from './types/Media.models';

import { IndexTemplateRouteData } from './templates/Index/IndexTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const mediaRoute = (templates: TemplateLocator, media: MediaNode): Route => {
  return newRoute<PageTemplateRouteData>(templates, media, {
    media
  });
};

const mediaListPageRoute = (templates: TemplateLocator, medias: MediaNode[]): Route => {
  const defaults = {
    path: 'media',
    template: 'Media/Index'
  };
  const page = newNode('page', 'All Media', defaults) as PageNode;

  return newRoute<IndexTemplateRouteData>(templates, page, {
    page,
    medias
  });
};

interface Data {
  medias: MediaNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const mediasRoutes = data.medias.map(media => {
    return mediaRoute(templates, media);
  });

  const pageRoute = mediaListPageRoute(templates, data.medias);
  const routes = [...mediasRoutes, pageRoute];

  return routes;
};
