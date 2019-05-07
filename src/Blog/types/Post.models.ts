import { Node } from '../../Shared/types/Node.models';
import { PageNode } from '../../Shared/types/Page.models';
import { Route, RouteData } from '../../Shared/types/Route.models';

export interface Post extends Node {}

export interface PostRouteData extends RouteData {
  post: Post;
}

export interface PostListRouteData extends RouteData {
  posts: Post[];
  page: PageNode;
}

export interface PostRoute extends Route {
  children?: PostRoute[];
  getData(): PostRouteData;
}
