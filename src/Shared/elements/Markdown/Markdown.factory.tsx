import * as React from 'react';
import rehypeReact from 'rehype-react';
import unified from 'unified';
import { VFileContents } from 'vfile';

import { anchoredHeading } from '../AnchoredHeading/AnchoredHeading.factory';
import { Link } from '../Link/Link.component';

import * as styles from './Markdown.module.scss';

type ComponentType = string | React.ComponentType<any>;

export interface MarkdownComponentMap {
  [x: string]: ComponentType;
}

const renderer = (processor: unified.Processor, componentMap: MarkdownComponentMap) => {
  const createElement = (component: string, props: any, children: any): JSX.Element => {
    const Tag = (componentMap && component && componentMap[component]) || component || 'div';
    return <Tag {...props}>{children}</Tag>;
  };

  processor.use(rehypeReact, { createElement });

  return (text: string): VFileContents => {
    return processor.processSync(text).contents;
  };
};

interface StaticProps {
  [key: string]: any;
}

export interface MarkdownComponentProps {
  text: string;
  [key: string]: any;
}

export const markdownFactory = (
  processor: unified.Processor,
  componentMap: MarkdownComponentMap,
  className?: string,
  staticProps?: StaticProps
): React.StatelessComponent<MarkdownComponentProps> => {
  const render = renderer(processor, componentMap);
  return props => {
    const { text } = props;
    return (
      <div className={`${styles.Markdown} ${className || ''}`} {...staticProps} {...props}>
        {render(text)}
      </div>
    );
  };
};

export const basicComponentMap: MarkdownComponentMap = {
  a: Link,
  h2: anchoredHeading('h2'),
  h3: anchoredHeading('h3'),
  h4: anchoredHeading('h4')
};
