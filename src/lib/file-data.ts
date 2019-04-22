import path from 'path';
import slugify from 'slugify';

import { File } from './files';
import { humanise } from './strings';

const remove = /[*+~.()'"!:@]/g;
const slug = (str: string) => slugify(str, { remove, lower: true });

export function makeTitle(data: any, name: string): string {
  return data.title || humanise(name);
}

export function makePath(prefix: string | string[], customPath: string, title: string): { rel: string; path: string } {
  const rel = slug(customPath || title);
  const parts = typeof prefix === 'string' ? [prefix] : prefix;
  const pth = path.join(...parts, rel);
  return {
    rel,
    path: pth
  };
}

export function makeTemplate(data: any, def: string): string {
  const container = data.template || def;
  return `src/containers/${container}/${container}.container`;
}
