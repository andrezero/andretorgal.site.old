import { join as pathJoin, resolve as pathResolve } from 'path';

import { newMeta } from './meta';
import { humanise, slug } from './strings';
import { cssClass } from './strings';

import { Node, Tag } from '../types/Node.models';
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

const makeClasses = (template: string, classes?: string | string[]) => {
  const classList = [cssClass(template)];
  if (typeof classes === 'string') {
    classList.push(classes);
  } else if (Array.isArray(classes)) {
    classList.push(...classes);
  }
  return classList.join(' ');
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

export const newNode = (type: string, title: string, defaults: NewNodeDefaults): Node => {
  const path = makePath(defaults.prefix || '', defaults.path, title);

  const created = defaults.created ? defaults.created : new Date();
  const updated = defaults.updated ? defaults.updated : new Date();

  const template = defaults.template;
  const classes = makeClasses(template);
  const meta = newMeta('data', `${type}:${path}`, template, classes, title, '', created, updated);

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

export const newNodeFromFile = (type: string, file: ParsedFile, defaults: NewNodeDefaults): NewNode => {
  const { data, abstract, content } = file;

  const title = makeTitle(data.title || defaults.title, file.name, file.path);
  const custom = customPath(file, data, defaults.path);
  const path = makePath(defaults.prefix || '', custom, title);
  const created = data.created ? new Date(data.created) : file.created;
  const updated = data.updated ? new Date(data.updated) : file.created;

  const template = data.template || defaults.template;
  const classes = makeClasses(template, data.classes);
  const meta = newMeta('file', file.filename, template, classes, title, file.notes, created, updated);

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

export const hasTag = (node: Node, tag: Tag): boolean => node.tags && node.tags.indexOf(tag) !== -1;

export const filterNotPaths = (paths: string[]) => (node: Node): boolean => paths.indexOf(node.path) === -1;

export const filterHasTag = (tag: string) => (node: Node): boolean => hasTag(node, tag);

export const filterHasNotTag = (tag: string) => (node: Node): boolean => !hasTag(node, tag);

export const dedupeTags = (tags: string[]): string[] => tags.filter((item, pos) => tags.indexOf(item) === pos);

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
