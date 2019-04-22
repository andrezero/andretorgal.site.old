import { Page } from './Page.model';
import { Route } from './Route.model';

export interface Post extends Page {}

export interface PostRouteData {
  post: Post;
}

export interface PostRoute extends Route {
  children?: PostRoute[];
  getData(): PostRouteData;
}
