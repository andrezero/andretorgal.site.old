import * as React from 'react';

import * as markdown from '../../lib/markdown';

import { basicComponentMap, MarkdownComponentProps, markdownFactory } from '../Markdown/Markdown.factory';

import './MarkdownBase.scss';

export const MarkdownBase: React.StatelessComponent<MarkdownComponentProps> = ({
  className = 'markdown-base',
  children,
  ...rest
}) => {
  const Component = markdownFactory(markdown.basic(), basicComponentMap);
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};
