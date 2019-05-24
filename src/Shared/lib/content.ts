import matter from 'gray-matter';

import { FileSysNode, ParsedFile } from './types/File.types';

const ABSTRACT_DELIMITER = '<!-- abstract -->';
const NOTES_DELIMITER = '<!-- notes -->';

const removeAbstract = (contents: string): string => {
  const idx = contents.indexOf(ABSTRACT_DELIMITER);
  if (idx !== -1) {
    return contents.slice(idx + ABSTRACT_DELIMITER.length);
  }
  return contents;
};

const extractNotes = (contents: string): { content: string; notes: string } => {
  const idx = contents.indexOf(NOTES_DELIMITER);
  let content = contents;
  let notes = '';
  if (idx !== -1) {
    content = contents.slice(0, idx).trim();
    notes = contents.slice(idx + NOTES_DELIMITER.length).trim();
  }
  return { content, notes };
};

export const parseFileContents = (stage: string, file: FileSysNode): ParsedFile => {
  const { filename, path, name, created } = file;

  const { data, content: fullContents, excerpt } = matter(file.contents, {
    excerpt_separator: ABSTRACT_DELIMITER
  });
  const abstract = excerpt.trim();
  const contentsNoAbstract = removeAbstract(fullContents).trim();
  const { content, notes: rawNotes } = extractNotes(contentsNoAbstract);
  const notes = stage !== 'prod' ? rawNotes : '';

  return { filename, name, path, data, abstract, content, notes, created };
};
