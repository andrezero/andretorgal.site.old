import dayjs from 'dayjs';
import matter from 'gray-matter';

import { NodeContent } from '../types/Node.models';

import { FileContents, FileSysNode } from './types/File.types';

const ABSTRACT_DELIMITER = '<!-- abstract -->';

const removeAbstract = (contents: string): string => {
  // if enabled, get the excerpt defined after front-matter
  const idx = contents.indexOf(ABSTRACT_DELIMITER);
  if (idx !== -1) {
    return contents.slice(idx + ABSTRACT_DELIMITER.length);
  }
  return contents;
};

export const parseFileContents = (file: FileSysNode): FileContents => {
  const { data, content: fullContents, excerpt: abstract } = matter(file.contents, {
    excerpt_separator: ABSTRACT_DELIMITER
  });
  data.created = dayjs(data.created || file.created);
  data.updated = dayjs(data.updated || file.created);
  const content = removeAbstract(fullContents);
  return { data, content, abstract };
};

export const makeContent = (source: string): NodeContent => {
  return { source };
};
