import matter from 'gray-matter';

import { NodeContent } from '../types/Node.models';

import { FileContents } from './types/File.types';

const ABSTRACT_DELIMITER = '<!-- abstract -->';

const removeAbstract = (contents: string): string => {
  // if enabled, get the excerpt defined after front-matter
  const idx = contents.indexOf(ABSTRACT_DELIMITER);
  if (idx !== -1) {
    return contents.slice(idx + ABSTRACT_DELIMITER.length);
  }
  return contents;
};

export const parseFileContents = (contents: string): FileContents => {
  const { data, content: fullContents, excerpt: abstract } = matter(contents, {
    excerpt_separator: ABSTRACT_DELIMITER
  });
  const content = removeAbstract(fullContents);
  return { data, content, abstract };
};

export const makeContent = (source: string): NodeContent => {
  return { source };
};
