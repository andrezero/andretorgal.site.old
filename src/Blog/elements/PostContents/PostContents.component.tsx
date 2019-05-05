import * as markdown from '../../../Shared/lib/markdown';

import {
  basicComponentMap,
  MarkdownComponentProps,
  markdownFactory
} from '../../../Shared/elements/Markdown/Markdown.factory';

import './PostContents.scss';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap, 'post-contents');

export const PostContents: React.StatelessComponent<MarkdownComponentProps> = createComponent();
