import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { findRoute, replaceRoute } from '../Shared/lib/routes';
import { cssClass } from '../Shared/lib/strings';
import { PageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { PostNode } from '../Blog/types/Post.models';

import { HomeTemplateRouteData } from './templates/Home/HomeTemplate.component';
import { PageTemplateRouteData } from './templates/Page/PageTemplate.component';

const pageRoute = (templates: TemplateLocator, page: PageNode): Route => {
  const template = page.template || 'Site/Page';
  const className = page.className || cssClass(template);
  return {
    path: page.path,
    template: templates.locate(template),
    getData: (): PageTemplateRouteData => ({
      className,
      page
    })
  };
};

const homePageRoute = (templates: TemplateLocator, originalHome: Route, posts: PostNode[]): Route => {
  const page = originalHome.getData().page;
  return {
    path: page.path,
    template: templates.locate('Site/Home'),
    getData: (): HomeTemplateRouteData => ({
      className: 'site-home',
      posts,
      page
    })
  };
};

interface Data {
  pages: PageNode[];
  posts: PostNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  let pagesRoutes = data.pages.map(page => pageRoute(templates, page));

  const originalHome = findRoute(pagesRoutes, '/');
  const homeRoute = homePageRoute(templates, originalHome, data.posts);
  pagesRoutes = replaceRoute(pagesRoutes, '/', homeRoute);

  return [...pagesRoutes];
};
