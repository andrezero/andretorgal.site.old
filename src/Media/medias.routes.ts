import { resolveNodeMeta } from '../Shared/lib/meta';
import { dedupeTags, newNode, sortCreated } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';
import { MediaNode } from './types/Media.models';

import { IndexTemplateRouteData } from './templates/Index/IndexTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const mediaListNodes = (nodes: Node[]): Node[] => {
  return nodes.sort(sortCreated).splice(0, 20);
};

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
  page.tags = dedupeTags(medias.reduce((tags, media) => tags.concat(media.tags), []));

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
    return mediaRoute(context, media as MediaNode);
  });

  const latestMedias = mediaListNodes(data.medias);
  const pageRoute = mediaListPageRoute(context, latestMedias as MediaNode[]);
  const routes = [...mediasRoutes, pageRoute];

  return routes;
};
