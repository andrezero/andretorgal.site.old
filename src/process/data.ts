import path from 'path';

import { PageMeta } from '../types/Page.model';
import { humanise, slug } from './strings';

export const makeTitle = (title: string, name: string): string => {
  return title || humanise(name);
};

export const makePath = (
  prefix: string | string[],
  customPath: string,
  title: string
): { rel: string; path: string } => {
  const rel = slug(customPath || title);
  const parts = typeof prefix === 'string' ? [prefix] : prefix;
  const pth = path.join(...parts, rel);
  return {
    rel,
    path: pth
  };
};

export const makeTemplate = (data: any, def: string): string => {
  const container = data.template || def;
  return `src/containers/${container}/${container}.container`;
};

export const makeMeta = (data?: any) => {
  const meta: PageMeta = [];
  meta.push({ name: 'description', value: data && data.abstract });
  meta.push({ name: 'created', value: data && data.created });
  meta.push({ name: 'author', value: data && data.author });
  meta.push({ property: 'og:url', content: data && data.url });
  meta.push({ property: 'og:type', content: (data && data.type) || 'article' });
  meta.push({ property: 'og:title', content: data && data.title });
  meta.push({ property: 'og:description', content: data && data.abstract });
  meta.push({ property: 'og:image', content: data && data.image });
  return meta;
};
