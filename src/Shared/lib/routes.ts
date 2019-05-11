import { Route } from '../types/Route.models';

export const replaceRoute = (routes: Route[], path: string, route: Route): Route[] => {
  return routes.map(r => (r.path === path ? route : r));
};

export const findRoute = (routes: Route[], path: string): Route => {
  return routes.find(r => r.path === path);
};
