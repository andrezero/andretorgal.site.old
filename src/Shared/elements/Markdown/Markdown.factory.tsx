import * as React from 'react';
import rehypeReact from 'rehype-react';
import unified from 'unified';

import { Anchor } from '../Anchor/Anchor.component';
import { anchoredHeading } from '../AnchoredHeading/AnchoredHeading.factory';
import { Link } from '../Link/Link.component';
import { MdChekbox } from '../MdCheckbox/MdCheckbox.component';
import { MdIframe } from '../MdIframe/MdIframe.component';
import { SROnly } from '../SROnly/SROnly.component';

type ComponentType = string | React.ComponentType<any>;

export interface MarkdownComponentAttributeTestMap {
  attr: string;
  map: {
    [x: string]: ComponentType;
  };
}

export interface MarkdownComponentMap {
  [tag: string]: ComponentType | MarkdownComponentAttributeTestMap;
}

interface StaticProps {
  [key: string]: any;
}

const map = (key: string, cMap: MarkdownComponentMap, props: StaticProps): React.ComponentType => {
  const defaultTag = 'div';
  const tag = (cMap && key && cMap[key]) || key || defaultTag;
  if (typeof tag === 'function' || typeof tag === 'string') {
    return tag as React.ComponentType;
  } else {
    const attributeTestMap = tag as MarkdownComponentAttributeTestMap;
    const value = props[attributeTestMap.attr];
    const attrMap = attributeTestMap.map;
    return ((attrMap && value && attrMap[value]) || key || defaultTag) as React.ComponentType;
  }
};

const renderer = (processor: unified.Processor, componentMap: MarkdownComponentMap) => {
  const createElement = (component: string, props: any, children: any): JSX.Element => {
    const Tag = map(component, componentMap, props);
    return <Tag {...props}>{children}</Tag>;
  };

  processor.use(rehypeReact, { createElement });

  return (text: string): React.ReactElement => {
    const node = (processor().processSync(text).contents as unknown) as React.ReactElement;
    if (node.type === 'div') {
      return node.props.children;
    }
    return node;
  };
};

export interface MarkdownComponentProps {
  children: string;
  className?: string;
  [key: string]: any;
}

export const markdownFactory = (
  processor: unified.Processor,
  componentMap: MarkdownComponentMap,
  staticProps?: StaticProps
): React.StatelessComponent<MarkdownComponentProps> => {
  const render = renderer(processor, componentMap);
  const MarkdownFactory = (props: StaticProps | MarkdownComponentProps) => {
    const { children, className } = props;
    if (!children) {
      return <></>;
    }
    return (
      <div className={className || ''} {...staticProps} {...props}>
        {render(children)}
      </div>
    );
  };
  return MarkdownFactory;
};

export const basicComponentMap: MarkdownComponentMap = {
  a: Link,
  anchor: Anchor,
  sronly: SROnly,
  h2: anchoredHeading('h2'),
  h3: anchoredHeading('h3'),
  h4: anchoredHeading('h4'),
  iframe: MdIframe,
  input: {
    attr: 'type',
    map: {
      checkbox: MdChekbox
    }
  }
};
