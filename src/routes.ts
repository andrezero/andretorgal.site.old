import { TemplateLocator } from './Shared/lib/classes/TemplateLocator';
import { AssetLocator, AssetPreset } from './Shared/types/Asset.models';
import { NodeMetaDefaults } from './Shared/types/Node.models';
import { Route } from './Shared/types/Route.models';
import { loadSources } from './sources';

import { buildRoutes as buildBlogRoutes } from './Blog/posts.routes';
import { buildRoutes as buildFeedRoutes } from './Feed/feed.routes';
import { buildRoutes as buildMediaRoutes } from './Media/medias.routes';
import { buildRoutes as buildMetasRoutes } from './Meta/metas.routes';
import { buildRoutes as buildPagesRoutes } from './Site/pages.routes';
import { buildRoutes as buildSiteRoutes } from './Site/site.routes';
import { buildRoutes as buildTaxonomyRoutes } from './Taxonomy/tags.routes';

const debug = (routes: Route[]) => {
  // tslint:disable
  console.log(`----- loaded ${routes.length} routes`);
  routes.forEach(route => {
    const data = route.getData();
    console.log(route.path, route.template);
    if (process.env.DEBUG_ROUTES === route.path) console.log(data);
  });
  // tslint:enable
};

export type RouteBuilder = () => Promise<Route[]>;

export const createRouteBuilder = (
  assetLocator: AssetLocator,
  assetPresets: AssetPreset[],
  metaDefaults: NodeMetaDefaults
): RouteBuilder => {
  const templates = new TemplateLocator();

  const routeBuilder: RouteBuilder = async () => {
    const sources = await loadSources(assetLocator, assetPresets, metaDefaults);
    const { nodes, pages, posts, metas, tags, medias } = sources;

    const groups = await Promise.all([
      buildSiteRoutes(templates),
      buildPagesRoutes(templates, { pages, posts }),
      buildBlogRoutes(templates, { posts }),
      buildMetasRoutes(templates, { metas }),
      buildFeedRoutes(templates, { nodes }),
      buildTaxonomyRoutes(templates, { tags, nodes }),
      buildMediaRoutes(templates, { medias })
    ]);

    const routes = groups.reduce((all, group) => all.concat(group), [] as Route[]);

    if (process.env.DEBUG_ROUTES) {
      debug(routes);
    }

    return routes;
  };

  return routeBuilder;
};
