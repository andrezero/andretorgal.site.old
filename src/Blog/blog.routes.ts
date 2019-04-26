import TemplateLocator from '../Shared/lib/classes/TemplateLocator';
import { makeMeta } from '../Shared/lib/meta';
import { cssClass } from '../Shared/lib/strings';
import { ContentPage, PageRoute } from '../Shared/types/Page.model';

import { Post, PostListRouteData, PostRoute, PostRouteData } from './types/Post.model';

const postRoute = (templates: TemplateLocator, post: Post): PostRoute => {
  const template = post.template || 'Blog/Post';
  const className = post.className || cssClass(template);
  return {
    path: post.path,
    template: templates.locate(template),
    getData: (): PostRouteData => ({
      className,
      post
    })
  };
};

const postListPage = (templates: TemplateLocator): ContentPage => {
  return {
    title: 'Latest blog posts',
    path: '/posts',
    created: new Date(),
    updated: new Date(),
    template: templates.locate('Blog/Home'),
    meta: makeMeta()
  };
};

const postListPageRoute = (templates: TemplateLocator, posts: Post[]): PageRoute => {
  const page = postListPage(templates);
  return {
    path: page.path,
    template: page.template,
    getData: (): PostListRouteData => ({
      className: 'blog',
      posts,
      page
    })
  };
};

interface Data {
  posts: Post[];
}

const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Array<PageRoute | PostRoute>> => {
  const pageRoute = postListPageRoute(templates, data.posts);
  const postRoutes = data.posts.map(page => postRoute(templates, page));
  return [pageRoute, ...postRoutes];
};

export default buildRoutes;
