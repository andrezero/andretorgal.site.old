import { Node } from './Node.models';
import { Route, RouteData } from './Route.models';

export interface PageNode extends Node {
  type: 'page';
}

export interface ErrorPageNode extends PageNode {
  type: 'page';
  error: string;
}

export interface PageRouteData extends RouteData {
  page: PageNode;
}

export interface PageRoute extends Route {
  children?: PageRoute[];
  getData(): PageRouteData;
}
