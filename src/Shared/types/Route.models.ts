export interface Route {
  is404?: boolean;
  path: string;
  template: string;
  getData: () => RouteData;
  children?: Route[];
}

export interface RouteData {
  [key: string]: any;
}
