import path from 'path';

import { PageMeta } from '../types/Page.model';
import { humanise, slug } from './strings';

export const makeTitle = (title: string, name: string): string => {
  return title || humanise(name);
};

export const makePath = (prefix: string | string[], customPath: string, title?: string): string => {
  const p = customPath || slug(title);
  const parts = typeof prefix === 'string' ? [prefix] : prefix;
  return path.join(...parts, p);
};
