import { Route } from './Route.model';

export interface PageContent {
  source: string;
  stripped: string;
}

export interface PageMetaItem {
  name: string;
  value: string;
}

export interface PageMetaOpenGraphItem {
  property: string;
  content: string;
}

export type PageMeta = Array<PageMetaItem | PageMetaOpenGraphItem>;

export interface Page {
  title: string;
  path: string;
  rel: string;
  template: string;
  created: Date;
  updated: Date;
  tags?: string[];
  content?: PageContent;
  abstract?: PageContent;
  meta?: PageMeta;
}

export interface PageRouteData {
  page: Page;
}

export interface PageRoute extends Route {
  children?: PageRoute[];
  getData(): PageRouteData;
}
