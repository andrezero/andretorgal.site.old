import path from 'path';

import { humanise, slug } from './strings';

export const makeTitle = (title: string, name: string): string => {
  return title || humanise(name || 'untitled');
};

export const makePath = (prefix: string | string[], customPath: string, title?: string): string => {
  const p = customPath || slug(title);
  const parts = typeof prefix === 'string' ? [prefix] : prefix;
  return path.join(...parts, p);
};
