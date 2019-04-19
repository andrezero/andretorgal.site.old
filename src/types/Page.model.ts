import { Route } from './Route.model';

export interface Page {
  title: string;
  path: string;
  relPath: string;
  content: string;
  template: string;
}

export interface PageData {
  page: Page;
}

export interface PageRoute extends Route {
  children?: PageRoute[];
  getData(): PageData;
}
