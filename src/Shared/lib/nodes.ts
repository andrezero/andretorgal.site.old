import { join as pathJoin, resolve as pathResolve } from 'path';

import { baseMeta } from './meta';
import { humanise, slug } from './strings';
import { cssClass } from './strings';

import { Node, NodeLink, Tag } from '../types/Node.models';
import { FileData, ParsedFile } from './types/File.types';

export const makeTitle = (title: string, name: string, path: string): string => {
  if (title === '{name}') {
    return name;
  } else if (title === '{path}' && path) {
    return path;
  } else if (title) {
    return title.trim();
  }
  return name ? humanise(name) : 'untitled';
};

export const makePath = (prefix: string | string[], custom?: string, title?: string): string => {
  const path = typeof custom !== 'undefined' ? custom : slug(title); // @todo limit (but check collisions)
  const parts = typeof prefix === 'string' ? [prefix] : prefix;
  return pathResolve(pathJoin('/', ...parts, path));
};

export interface NewNode {
  node: Node;
  data: FileData;
}

export interface NewNodeDefaults {
  template: string;
  prefix?: string;
  path?: string;
  title?: string;
  created?: Date;
  updated?: Date;
}

const makeClasses = (template: string, classes?: string) => {
  const classess = [cssClass(template)];
  if (classes) {
    classess.push(classes);
  }
  return classess.join(' ');
};

export const newNode = (type: string, title: string, defaults: NewNodeDefaults): Node => {
  const path = makePath(defaults.prefix || '', defaults.path, title);

  const created = defaults.created ? defaults.created : new Date();
  const updated = defaults.updated ? defaults.updated : new Date();

  const template = defaults.template;
  const classes = makeClasses(template);
  const meta = baseMeta(`${type}:${path}`, template, classes, title, created, updated);

  const node: Node = {
    type,
    path,
    title,
    abstract: '',
    content: '',
    tags: [],
    features: {},
    meta,
    created,
    updated
  };

  return node;
};

function customPath(file: ParsedFile, data: FileData, defaultPath?: string): string {
  if (typeof defaultPath === 'undefined') {
    return data.path;
  } else if (defaultPath === '{path}') {
    return file.path;
  } else if (defaultPath === '{name}') {
    return file.name;
  } else {
    return defaultPath;
  }
}

export const newNodeFromFile = (type: string, file: ParsedFile, defaults: NewNodeDefaults): NewNode => {
  const { data, abstract, content } = file;

  const title = makeTitle(data.title || defaults.title, file.name, file.path);
  const custom = customPath(file, data, defaults.path);
  const path = makePath(defaults.prefix || '', custom, title);
  const created = data.created ? new Date(data.created) : file.created;
  const updated = data.updated ? new Date(data.updated) : file.created;

  const template = data.template || defaults.template;
  const classes = makeClasses(template, data.classes);
  const meta = baseMeta(file.name, template, classes, title, created, updated);

  const node: Node = {
    type,
    path,
    title,
    abstract,
    content,
    tags: data.tags || [],
    features: {},
    meta,
    created,
    updated
  };

  return { data, node };
};

export const linkToNode = (node: Node): NodeLink => {
  const { type, path, title } = node;
  return { type, path, title };
};

export const hasTag = (node: Node, tag: Tag): boolean => node.tags && node.tags.indexOf(tag) !== -1;

export const filterNoRoot = (node: Node): boolean => node.path !== '/';

export const filterHasTag = (tag: string) => (node: Node): boolean => hasTag(node, tag);

export const sortCreated = (p1: Node, p2: Node): number => {
  if (!p2.created) {
    return 1;
  }
  if (!p1.created) {
    return -1;
  }
  return p2.created.getTime() - p1.created.getTime();
};

export const sortUpdated = (p1: Node, p2: Node): number => {
  if (!p2.updated) {
    return 1;
  }
  if (!p1.updated) {
    return -1;
  }
  return p2.updated.getTime() - p1.updated.getTime();
};

export const linkHierarchy = <T extends Node>(nodes: T[]) => {
  nodes.forEach(parent => {
    parent.meta.links.children = parent.meta.links.children || [];
    nodes.forEach(child => {
      if (child === parent) {
        return;
      }
      const parentPath = child.path
        .split('/')
        .slice(0, -1)
        .join('/');
      if (pathResolve(parentPath) === pathResolve(parent.path)) {
        child.meta.links = child.meta.links || {};
        child.meta.links.parent = linkToNode(parent);
        parent.meta.links.children.push(linkToNode(child));
      }
    });
  });
};

export const linkAdjacent = <T extends Node>(nodes: T[]) => {
  nodes.forEach((node, index) => {
    const previous = nodes[index + 1];
    const next = nodes[index - 1];
    if (previous) {
      node.meta.links.previous = linkToNode(previous);
    }
    if (next) {
      node.meta.links.next = linkToNode(next);
    }
  });
};
