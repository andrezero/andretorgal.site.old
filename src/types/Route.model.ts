export interface Route {
  is404?: boolean;
  path: string;
  template: string;
  getData: () => any;
  children?: Route[];
}
