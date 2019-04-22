import * as React from 'react';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkUnlink from 'remark-unlink';
import unified from 'unified';
import { VFileContents } from 'vfile';

import './Markdown.css';

import Link from 'atoms/Link/Link.component';

type ComponentType = string | React.ComponentType<any>;

interface ComponentMap {
  [x: string]: ComponentType;
}

const components: ComponentMap = {
  a: Link
};

const createElement = (component: string, props: any, children: any): JSX.Element => {
  const Tag = (components && component && components[component]) || component || 'div';
  return <Tag {...props}>{children}</Tag>;
};

const parser = unified().use(remarkParse);

const pipeline = (base: unified.Processor) =>
  base
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(rehypeRaw)
    .use(rehypeReact, { createElement });

const fullPipeline = pipeline(parser);
const strippedPipeline = pipeline(parser.use(remarkUnlink));

const render = (text: string, stripped?: boolean): VFileContents => {
  const processor = stripped ? strippedPipeline : fullPipeline;
  return processor.processSync(text).contents;
};

interface Props {
  text: string;
  stripped?: boolean;
}

const Markdown: React.StatelessComponent<Props> = ({ text, stripped }) => {
  return <div className="Markdown">{render(text, stripped)}</div>;
};

export default Markdown;
