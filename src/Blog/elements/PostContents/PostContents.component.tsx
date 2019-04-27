import * as markdown from '../../../Shared/lib/markdown';

import {
  basicComponentMap,
  MarkdownComponentProps,
  markdownFactory
} from '../../../Shared/elements/Markdown/Markdown.factory';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap);

export const PostContents: React.StatelessComponent<MarkdownComponentProps> = createComponent();
