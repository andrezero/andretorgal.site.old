import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { findRoute, newRoute, replaceRoute } from '../Shared/lib/routes';
import { Route } from '../Shared/types/Route.models';

import { PostNode } from '../Blog/types/Post.models';
import { PageNode } from '../Shared/types/Page.models';

import { HomeTemplateRouteData } from './templates/Home/HomeTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const homePageRoute = (templates: TemplateLocator, originalHome: Route, posts: PostNode[]): Route => {
  const page = originalHome.getData().page as PageNode;
  page.meta.template = 'Site/Home';

  return newRoute<HomeTemplateRouteData>(templates, page, {
    page,
    posts
  });
};

interface Data {
  pages: PageNode[];
  posts: PostNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  let pagesRoutes: Route[] = data.pages.map(page => {
    return newRoute<PageTemplateRouteData>(templates, page, {
      page
    });
  });

  const originalHome = findRoute(pagesRoutes, '/');
  const homeRoute = homePageRoute(templates, originalHome, data.posts);
  pagesRoutes = replaceRoute(pagesRoutes, '/', homeRoute);

  return [...pagesRoutes];
};
