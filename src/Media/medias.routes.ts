import { resolveNodeMeta } from '../Shared/lib/meta';
import { newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { PageNode } from '../Shared/types/Page.models';
import { MediaNode } from './types/Media.models';

import { IndexTemplateRouteData } from './templates/Index/IndexTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const mediaRoute = (context: RouteContext, media: MediaNode): Route => {
  return newRoute<PageTemplateRouteData>(context, media, {
    media
  });
};

const mediaListPageRoute = (context: RouteContext, medias: MediaNode[]): Route => {
  const defaults = {
    path: 'media',
    template: 'Media/Index'
  };
  const page = newNode('page', 'All Media', defaults) as PageNode;

  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  return newRoute<IndexTemplateRouteData>(context, page, {
    page,
    medias
  });
};

interface Data {
  medias: MediaNode[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const mediasRoutes = data.medias.map(media => {
    return mediaRoute(context, media);
  });

  const pageRoute = mediaListPageRoute(context, data.medias);
  const routes = [...mediasRoutes, pageRoute];

  return routes;
};
