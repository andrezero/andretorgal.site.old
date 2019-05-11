import { Node } from './Node.models';
import { Route, RouteData } from './Route.models';

export interface PageNode extends Node {
  type: 'page';
}

export interface ErrorPageNode extends PageNode {
  type: 'page';
  error: string;
}
