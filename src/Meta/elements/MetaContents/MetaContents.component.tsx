import * as markdown from '../../../Shared/lib/markdown';

import {
  basicComponentMap,
  MarkdownComponentProps,
  markdownFactory
} from '../../../Shared/elements/Markdown/Markdown.factory';

import './MetaContents.scss';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap, 'meta-contents');

export const MetaContents: React.StatelessComponent<MarkdownComponentProps> = createComponent();
