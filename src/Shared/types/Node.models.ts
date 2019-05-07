import { Route, RouteData } from './Route.models';

export interface NodeContent {
  source: string;
}

export interface NodeMetaItem {
  name: string;
  value: string;
}

export interface NodeMetaOpenGraphItem {
  property: string;
  content: string;
}

export type NodeMeta = Array<NodeMetaItem | NodeMetaOpenGraphItem>;

export interface Node {
  type: string;
  title: string;
  path?: string;
  className?: string;
  template?: string;
  created?: Date;
  updated?: Date;
  tags?: string[];
  content?: NodeContent;
  abstract?: NodeContent;
  meta?: NodeMeta;
}

export interface NodeRouteData extends RouteData {
  page: Node;
}

export interface NodeRoute extends Route {
  children?: NodeRoute[];
  getData(): NodeRouteData;
}
