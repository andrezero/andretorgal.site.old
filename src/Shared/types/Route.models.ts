import { TemplateLocator } from '../lib/classes/TemplateLocator';
import { AssetLocator } from './Asset.models';
import { NodeMetaDefaults } from './Node.models';

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

export type RouteBuilder = () => Promise<Route[]>;

export interface RouteContext {
  stage: string;
  templateLocator: TemplateLocator;
  assetLocator: AssetLocator;
  metaDefaults: NodeMetaDefaults;
}
