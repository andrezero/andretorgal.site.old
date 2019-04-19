import fs from 'fs';
import path from 'path';

interface Options {
  root: string;
  index: string;
  ext: string;
  regexp: RegExp;
  recursive: boolean;
}

export interface Node {
  type: string;
  name: string;
  path: string;
  filename: string;
  contents: string;
}

export interface File extends Node {
  type: 'file';
}

export interface Directory extends Node {
  type: 'dir';
  hasIndex: boolean;
  children: Node[];
}

function filterNodes(nodes: Array<Node | void>): Node[] {
  return nodes.reduce(
    (acc, node: Node) => {
      if (!node) {
        return acc;
      }
      if (acc.find(item => item.path === node.path)) {
        return acc;
      }
      if (node.type === 'dir' && !(node as Directory).hasIndex && !(node as Directory).children.length) {
        return acc;
      }
      return acc.concat(node);
    },
    [] as Node[]
  );
}

async function readNode(options: Options, root: string, filename: string): Promise<Node | void> {
  const fullPath = path.resolve(options.root, root, filename);
  const isDir = fs.statSync(fullPath).isDirectory();
  if (isDir && options.recursive) {
    return await readDir(options, fullPath, root, filename);
  }
  return await readFile(options, fullPath, root, filename);
}

async function readFile(options: Options, fullPath: string, root: string, filename: string): Promise<File | void> {
  const matches = filename.match(options.regexp);
  if (!matches) {
    return;
  }
  const fileNoExt = matches[1];
  const pathName = fileNoExt === options.index ? '' : fileNoExt;
  return {
    type: 'file',
    name: fileNoExt,
    path: path.join(root, pathName),
    filename: fullPath,
    contents: fs.readFileSync(fullPath, 'utf8')
  };
}

async function readDir(options: Options, fullPath: string, root: string, filename: string): Promise<Directory> {
  const files = fs.readdirSync(fullPath);
  const newRoot = path.join(root, filename);
  const children = await Promise.all(files.map(fname => readNode(options, newRoot, fname)));
  let filtered = filterNodes(children);
  const self = filtered.find(node => node.name === options.index);
  if (self) {
    filtered = filtered.filter(node => node !== self);
  }
  const dirPath = path.join(root, filename);
  return {
    type: 'dir',
    name: filename || '',
    path: dirPath === '.' ? '/' : dirPath,
    filename: fullPath,
    contents: self ? self.contents : '',
    hasIndex: !!self,
    children: filtered
  };
}

export async function collect(root: string, recursive?: boolean): Promise<Directory> {
  const fullPath = path.resolve(root);
  const hasIndex = fs.existsSync(fullPath);
  const isDir = hasIndex && fs.statSync(fullPath).isDirectory();
  if (!hasIndex || !isDir) {
    return {
      type: 'dir',
      name: '',
      filename: root,
      path: '',
      hasIndex: false,
      contents: '',
      children: []
    };
  }
  const options: Options = {
    root,
    index: 'index',
    ext: 'md',
    regexp: /(.+)\.md$/,
    recursive: !!recursive
  };
  return readDir(options, root, '', '');
}

export function flatten(nodes: Node[], includeDirs?: boolean): File[] {
  return nodes.reduce(
    (acc, node: Node) => {
      const n = { ...node };
      if (n.type === 'file') {
        acc.push(n as File);
        return acc;
      } else if (includeDirs) {
        acc.push(n as File);
      }
      return acc.concat(flatten((n as Directory).children));
    },
    [] as File[]
  );
}

export function map<T extends File | Directory, R>(node: T, fn: (node: T) => R | void): R | void {
  if (node.type === 'dir') {
    const dir = node as Directory;
    const children = dir.children.map((child: T) => map<T, R>(child, fn));
    const ret = { ...fn(node), children: children.filter(item => item) };
    return ret as R;
  } else {
    return fn(node);
  }
}
