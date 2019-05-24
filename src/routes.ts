import { TemplateLocator } from './Shared/lib/classes/TemplateLocator';
import { Route } from './Shared/types/Route.models';
import { Sources } from './sources';

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

export type SourceLoader = () => Promise<Sources>;
export type RouteBuilder = () => Promise<Route[]>;

export const createRouteBuilder = (
  stage: string,
  sourceLoader: SourceLoader,
  templateLocator: TemplateLocator
): RouteBuilder => {
  const routeBuilder: RouteBuilder = async () => {
    const sources = await sourceLoader();
    const { nodes, pages, posts, metas, tags, medias } = sources;

    const groups = await Promise.all([
      buildSiteRoutes(stage, templateLocator),
      buildPagesRoutes(stage, templateLocator, { pages, posts }),
      buildBlogRoutes(stage, templateLocator, { posts }),
      buildMetasRoutes(stage, templateLocator, { metas }),
      buildFeedRoutes(stage, templateLocator, { nodes }),
      buildTaxonomyRoutes(stage, templateLocator, { tags, nodes }),
      buildMediaRoutes(stage, templateLocator, { medias })
    ]);

    const routes = groups.reduce((all, group) => all.concat(group), [] as Route[]);

    if (process.env.DEBUG_ROUTES) {
      debug(routes);
    }

    return routes;
  };

  return routeBuilder;
};
