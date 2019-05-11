import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { makeMeta } from '../Shared/lib/meta';
import { cssClass } from '../Shared/lib/strings';
import { PageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { HomeTemplateRouteData } from './templates/Home/HomeTemplate.component';
import { PostTemplateRouteData } from './templates/Post/PostTemplate.component';
import { PostNode } from './types/Post.models';

const postRoute = (templates: TemplateLocator, post: PostNode): Route => {
  const template = post.template || 'Blog/Post';
  const className = post.className || cssClass(template);
  return {
    path: post.path,
    template: templates.locate(template),
    getData: (): PostTemplateRouteData => ({
      className,
      post
    })
  };
};

const postListPage = (): PageNode => {
  return {
    type: 'page',
    title: 'Latest blog posts',
    path: '/posts',
    created: new Date(),
    updated: new Date(),
    meta: makeMeta()
  };
};

const postListPageRoute = (templates: TemplateLocator, posts: PostNode[]): Route => {
  const page = postListPage();
  return {
    path: page.path,
    template: templates.locate('Blog/Home'),
    getData: (): HomeTemplateRouteData => ({
      className: 'blog',
      posts,
      page
    })
  };
};

interface Data {
  posts: PostNode[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const pageRoute = postListPageRoute(templates, data.posts);
  const postRoutes = data.posts.map(page => postRoute(templates, page));
  return [pageRoute, ...postRoutes];
};
