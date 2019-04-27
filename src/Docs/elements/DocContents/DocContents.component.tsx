import * as React from 'react';
import * as markdown from '../../../Shared/lib/markdown';

import {
  basicComponentMap,
  MarkdownComponentMap,
  MarkdownComponentProps,
  markdownFactory
} from '../../../Shared/elements/Markdown/Markdown.factory';

const Children = () => <h3>HEY!</h3>;

const createComponent = () => {
  const components: MarkdownComponentMap = {
    ...basicComponentMap,
    children: Children
  };
  return markdownFactory(markdown.basic(), components);
};

export const DocContents: React.StatelessComponent<MarkdownComponentProps> = createComponent();
