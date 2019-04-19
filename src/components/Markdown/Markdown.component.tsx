import { Link } from '@reach/router';
import * as React from 'react';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import unified from 'unified';

import './Markdown.css';

type ComponentType = string | React.ComponentType<any>;

interface ComponentMap {
  [x: string]: ComponentType;
}

const components: ComponentMap = {
  a: Link
};

function createElement(component: string, props: any, children: any) {
  const Tag = (components && component && components[component]) || component || 'div';

  return <Tag {...props}>{children}</Tag>;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

interface Props {
  text: string;
}

export default function Markdown(props: Props) {
  const { text } = props;
  return <div className="Markdown">{processor.processSync(text).contents}</div>;
}
