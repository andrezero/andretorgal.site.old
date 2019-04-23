import matter from 'gray-matter';
import toString from 'mdast-util-to-string';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import unified from 'unified';

import { FileContents } from '../types/File.types';
import { PageContent } from '../types/Page.model';

const ABSTRACT_DELIMITER = '<!-- abstract -->';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw);

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

export const makeContent = (source: string): PageContent => {
  const tree = processor.parse(source);
  const stripped = toString(tree);
  return { source, stripped };
};
