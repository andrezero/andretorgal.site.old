// import toString from 'mdast-util-to-string';
import rehypeParse from 'rehype-parse';
import unified from 'unified';

export const parser = (): unified.Processor => unified().use(rehypeParse);
