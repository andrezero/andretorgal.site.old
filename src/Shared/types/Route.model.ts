export interface Route {
  is404?: boolean;
  path: string;
  template: string;
  getData: () => RouteData;
  children?: Route[];
}

export interface RouteData {
  className: string;
  [key: string]: any;
}
