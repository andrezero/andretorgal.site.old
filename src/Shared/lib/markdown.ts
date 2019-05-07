import toString from 'mdast-util-to-string';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkUnlink from 'remark-unlink';
import unified from 'unified';

export const basic = (): unified.Processor =>
  unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeRaw);

export const strippedLinks = (): unified.Processor =>
  unified()
    .use(remarkParse)
    .use(remarkUnlink)
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeRaw);

const stripper: unified.Processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw);

export const strip = (source: string): string => {
  const tree = stripper.parse(source);
  return toString(tree);
};
