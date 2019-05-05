import * as markdown from '../../../Shared/lib/markdown';

import {
  basicComponentMap,
  MarkdownComponentProps,
  markdownFactory
} from '../../../Shared/elements/Markdown/Markdown.factory';

import './DocContents.scss';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap, 'doc-contents');

export const DocContents: React.StatelessComponent<MarkdownComponentProps> = createComponent();
