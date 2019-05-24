import { Asset } from './Asset.models';

export type Tag = string;

export type NodeFeature = any;

export interface DocMeta {
  name: string;
  content: string;
}

export interface OpenGraphMeta {
  property: string;
  content: string;
}

export interface NodeLink {
  type: string;
  path: string;
  title: string;
}

export interface NodeLinks {
  children?: NodeLink[];
  related?: NodeLink[];
  parent?: NodeLink;
  parents?: NodeLink[];
  next?: NodeLink;
  previous?: NodeLink;
}

export interface NodeSource {
  type: string;
  ref: string;
}

export interface NodeData {
  [key: string]: any;
}

export interface NodeMeta {
  source: NodeSource;
  data: NodeData;
  template: string;
  notes: string;
  classes: string;
  doc: DocMeta[];
  og: OpenGraphMeta[];
  links: NodeLinks;
  assets: Asset[];
}

export interface Node {
  type: string;
  path: string;
  title: string;
  abstract: string;
  content: string;
  tags: Tag[];
  features: {
    [key: string]: NodeFeature;
  };
  meta: NodeMeta;
  created: Date;
  updated: Date;
}

export interface NodeMetaDefaults {
  description: string;
  author: string;
  image: string;
  assetsUrl: string;
  baseUrl: string;
}

export interface NodeIndex {
  [path: string]: Node;
}
