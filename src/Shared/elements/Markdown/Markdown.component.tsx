import * as React from 'react';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkUnlink from 'remark-unlink';
import unified from 'unified';
import { VFileContents } from 'vfile';

import { AnchoredHeading } from '../../elements/AnchoredHeading/AnchoredHeading.component';
import { Link } from '../../elements/Link/Link.component';

import * as styles from './Markdown.module.scss';

type ComponentType = string | React.ComponentType<any>;

interface ComponentMap {
  [x: string]: ComponentType;
}

const components: ComponentMap = {
  a: Link,
  h2: AnchoredHeading('h2'),
  h3: AnchoredHeading('h3'),
  h4: AnchoredHeading('h4')
};

const createElement = (component: string, props: any, children: any): JSX.Element => {
  const Tag = (components && component && components[component]) || component || 'div';
  return <Tag {...props}>{children}</Tag>;
};

const fullPipeline = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

const strippedPipeline = unified()
  .use(remarkParse)
  .use(remarkUnlink)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

const render = (text: string, stripped?: boolean): VFileContents => {
  let processor;
  if (stripped) {
    processor = strippedPipeline;
  } else {
    processor = fullPipeline;
  }
  return processor.processSync(text).contents;
};

interface Props {
  text: string;
  stripped?: boolean;
}

export const Markdown: React.StatelessComponent<Props> = ({ text, stripped }) => {
  return <div className={styles.Markdown}>{render(text, stripped)}</div>;
};
