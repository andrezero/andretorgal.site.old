import { ContentPage } from './Page.model';
import { Route } from './Route.model';

export interface Post extends ContentPage {}

export interface PostRouteData {
  post: Post;
}

export interface PostListRouteData {
  posts: Post[];
  page: ContentPage;
}

export interface PostRoute extends Route {
  children?: PostRoute[];
  getData(): PostRouteData;
}
