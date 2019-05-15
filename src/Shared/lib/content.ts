import matter from 'gray-matter';

import { FileSysNode, ParsedFile } from './types/File.types';

const ABSTRACT_DELIMITER = '<!-- abstract -->';

const removeAbstract = (contents: string): string => {
  // if enabled, get the excerpt defined after front-matter
  const idx = contents.indexOf(ABSTRACT_DELIMITER);
  if (idx !== -1) {
    return contents.slice(idx + ABSTRACT_DELIMITER.length);
  }
  return contents;
};

export const parseFileContents = (file: FileSysNode): ParsedFile => {
  const { path, name, created } = file;

  const { data, content: fullContents, excerpt } = matter(file.contents, {
    excerpt_separator: ABSTRACT_DELIMITER
  });
  const abstract = excerpt.trim();
  const content = removeAbstract(fullContents).trim();

  return { name, path, data, abstract, content, created };
};
