import { Route } from './Route.model';

export interface Page {
  title: string;
  path: string;
  rel: string;
  content: string;
  template: string;
  created: Date;
  updated: Date;
  tags: string[];
}

export interface PageRouteData {
  page: Page;
}

export interface PageRoute extends Route {
  children?: PageRoute[];
  getData(): PageRouteData;
}
