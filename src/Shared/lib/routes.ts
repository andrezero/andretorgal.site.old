import { TemplateLocator } from './classes/TemplateLocator';

import { Node } from '../types/Node.models';
import { Route } from '../types/Route.models';

export const newRoute = <T>(templates: TemplateLocator, node: Node, data: T): Route => {
  return {
    path: node.path,
    template: templates.locate(node.meta.template),
    getData: (): T => ({
      ...data,
      classes: node.meta.classes
    })
  };
};

export const replaceRoute = (routes: Route[], path: string, route: Route): Route[] => {
  return routes.map(r => (r.path === path ? route : r));
};

export const findRoute = (routes: Route[], path: string): Route => {
  return routes.find(r => r.path === path);
};
