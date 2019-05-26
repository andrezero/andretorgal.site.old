import { resolveNodeMeta } from '../Shared/lib/meta';
import { dedupeTags } from '../Shared/lib/nodes';
import { newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { PageNode } from '../Shared/types/Page.models';
import { PostNode } from './types/Post.models';

import { HomeTemplateRouteData } from './templates/Home/HomeTemplate.component';
import { PostTemplateRouteData } from './templates/Post/PostTemplate.component';

const postListPageRoute = (context: RouteContext, posts: PostNode[]): Route => {
  const defaults = {
    path: 'posts',
    template: 'Blog/Home'
  };
  const page = newNode('page', 'Latest Blog Posts', defaults) as PageNode;
  page.tags = dedupeTags(posts.reduce((t, post) => t.concat(post.tags), []));

  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  return newRoute<HomeTemplateRouteData>(context, page, {
    posts,
    page
  });
};

interface Data {
  posts: PostNode[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const postRoutes = data.posts.map(post => {
    return newRoute<PostTemplateRouteData>(context, post, {
      post
    });
  });

  const pageRoute = postListPageRoute(context, data.posts);
  return [...postRoutes, pageRoute];
};
