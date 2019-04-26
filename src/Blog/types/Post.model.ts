import { ContentPage } from '../../Shared/types/Page.model';
import { Route, RouteData } from '../../Shared/types/Route.model';

export interface Post extends ContentPage {}

export interface PostRouteData extends RouteData {
  post: Post;
}

export interface PostListRouteData extends RouteData {
  posts: Post[];
  page: ContentPage;
}

export interface PostRoute extends Route {
  children?: PostRoute[];
  getData(): PostRouteData;
}
