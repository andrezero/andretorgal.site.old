export interface Route {
  path: string;
  template: string;
  getData: () => any;
  children?: Route[];
}
