import { Route, RouteData } from './Route.model';

// @todo move to Markdown
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

interface Page {
  title: string;
  path?: string;
  className?: string;
}

export interface ContentPage extends Page {
  template?: string;
  created?: Date;
  updated?: Date;
  tags?: string[];
  content?: PageContent;
  abstract?: PageContent;
  meta?: PageMeta;
}

export interface ErrorPage extends Page {
  content?: PageContent;
  meta?: PageMeta;
}

export interface PageRouteData extends RouteData {
  page: Page;
}

export interface PageRoute extends Route {
  children?: PageRoute[];
  getData(): PageRouteData;
}
