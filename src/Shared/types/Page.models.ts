import { HeroFeature } from './Features.models';
import { Node } from './Node.models';

export interface PageNode extends Node {
  type: 'page';
  features: {
    hero?: HeroFeature;
  };
}

export interface ErrorPageNode extends PageNode {
  type: 'page';
  error: string;
}
