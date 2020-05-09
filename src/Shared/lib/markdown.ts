import toString from 'mdast-util-to-string';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import strip from 'remark-strip-html';
import remarkUnlink from 'remark-unlink';
import unified from 'unified';

import { findImages as findImagesInMarkdown } from './unified.mdast';

export const parser = (): unified.Processor => unified().use(remarkParse);

export const basic = (): unified.Processor =>
  unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeRaw);

export const stripLinks = (): unified.Processor =>
  unified()
    .use(remarkParse)
    .use(remarkUnlink)
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeRaw);

const stripper: unified.Processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw);

export const stripAll = (source: string): string => {
  const tree = stripper.parse(source);
  return toString(tree);
};

interface Author {
  name?: string;
  url?: string;
}

interface License {
  name?: string;
  url?: string;
}

export interface MarkdownImage {
  type: string;
  title?: string;
  url: string;
  alt?: string;
  author?: Author;
  license?: License;
}

interface Vars {
  [key: string]: string;
}

const extractAuthor = (vars: Vars): Author | undefined => {
  if (vars.an || vars.au) {
    return {
      name: vars.an,
      url: vars.au
    };
  }
};

const extractLicense = (vars: Vars): License | undefined => {
  if (vars.ln || vars.lu) {
    return {
      name: vars.ln,
      url: vars.lu
    };
  }
};

const parseMatches = (matches: string[]): Vars => {
  const vars = {};
  matches.forEach(match => {
    const v = match.match(/\|([a-z]+)\s(.*)/);
    if (v) {
      vars[v[1]] = v[2].trim();
    }
  });
  return vars;
};

const parseAlt = (alt: string) => {
  let stripped = alt;
  let author;
  let license;
  const matches = alt.match(/\|[a-z]{2}\s([^|]*)/g);
  if (matches) {
    const vars = parseMatches(matches);
    stripped = alt.replace(/\|.*/, '').trim();
    author = extractAuthor(vars);
    license = extractLicense(vars);
  }
  return { alt: stripped, author, license };
};

export const findImages = (source: string): MarkdownImage[] => {
  const tree = parser()
    .use(strip)
    .parse(source);

  const processor = unified().use(findImagesInMarkdown);
  const results = processor.runSync(tree).children as any[];

  const images: MarkdownImage[] = results.map(result => {
    const { type, title, url, alt } = result;

    const { alt: strippedAlt, author, license } = parseAlt(alt);

    return {
      type,
      title: title || strippedAlt,
      url,
      alt: strippedAlt,
      author,
      license
    };
  });

  return images;
};
