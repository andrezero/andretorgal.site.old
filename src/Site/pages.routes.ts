import { resolveNodeMeta } from '../Shared/lib/meta';
import { dedupeTags } from '../Shared/lib/nodes';
import { findRoute, newRoute, replaceRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { PostNode } from '../Blog/types/Post.models';
import { PageNode } from '../Shared/types/Page.models';

import { HomeTemplateRouteData } from './templates/Home/HomeTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const homePageRoute = (context: RouteContext, originalHome: Route, posts: PostNode[]): Route => {
  const page = originalHome.getData().page as PageNode;
  page.meta.template = 'Site/Home';
  page.tags = dedupeTags(posts.reduce((tags, post) => tags.concat(post.tags), []));

  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  return newRoute<HomeTemplateRouteData>(context, page, {
    page,
    posts
  });
};

interface Data {
  pages: PageNode[];
  posts: PostNode[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  let pagesRoutes: Route[] = data.pages.map(page => {
    return newRoute<PageTemplateRouteData>(context, page, {
      page
    });
  });

  const originalHome = findRoute(pagesRoutes, '/');
  const homeRoute = homePageRoute(context, originalHome, data.posts);
  pagesRoutes = replaceRoute(pagesRoutes, '/', homeRoute);

  return [...pagesRoutes];
};
