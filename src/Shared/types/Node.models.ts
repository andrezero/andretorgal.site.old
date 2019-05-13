export interface NodeContent {
  source: string;
}

export interface NodeMetaItem {
  name: string;
  value: string;
}

export interface NodeMetaOpenGraphItem {
  property: string;
  content: string;
}

export type Tag = string;

export type NodeMeta = Array<NodeMetaItem | NodeMetaOpenGraphItem>;

export interface Node {
  type: string;
  title: string;
  path?: string;
  className?: string;
  template?: string;
  created?: Date;
  updated?: Date;
  tags?: Tag[];
  content?: NodeContent;
  abstract?: NodeContent;
  meta?: NodeMeta;
  links?: {
    children?: NodeLink[];
    related?: NodeLink[];
    parent?: NodeLink;
    next?: NodeLink;
    previous?: NodeLink;
  };
}

export interface NodeLink {
  type: string;
  path: string;
  title: string;
}
