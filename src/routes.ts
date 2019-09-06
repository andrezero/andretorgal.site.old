import { Route, RouteBuilder, RouteContext } from './Shared/types/Route.models';

import { buildRoutes as buildBlogRoutes } from './Blog/posts.routes';
import { buildRoutes as buildFeedRoutes } from './Feed/feed.routes';
import { buildRoutes as buildMediaRoutes } from './Media/medias.routes';
import { buildRoutes as buildMetasRoutes } from './Meta/metas.routes';
import { buildRoutes as buildPagesRoutes } from './Site/pages.routes';
import { buildRoutes as buildSiteRoutes } from './Site/site.routes';
import { buildRoutes as buildTaxonomyRoutes } from './Taxonomy/tags.routes';

import { Sources } from './sources';

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

type SourceLoader = () => Promise<Sources>;

export const createRouteBuilder = (sourceLoader: SourceLoader, context: RouteContext): RouteBuilder => {
  const routeBuilder: RouteBuilder = async () => {
    const sources = await sourceLoader();
    const { nodes, pages, posts, metas, tags, medias } = sources;

    const groups = await Promise.all([
      buildSiteRoutes(context),
      buildPagesRoutes(context, { pages, posts }),
      buildBlogRoutes(context, { posts }),
      buildMetasRoutes(context, { metas }),
      buildFeedRoutes(context, { nodes }),
      buildTaxonomyRoutes(context, { tags, nodes }),
      buildMediaRoutes(context, { medias })
    ]);

    const routes = groups.reduce((all, group) => all.concat(group), [] as Route[]);

    if (process.env.DEBUG_ROUTES) {
      debug(routes);
    }

    return routes;
  };

  return routeBuilder;
};
