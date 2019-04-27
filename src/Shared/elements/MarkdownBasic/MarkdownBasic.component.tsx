import * as markdown from '../../lib/markdown';

import { basicComponentMap, MarkdownComponentProps, markdownFactory } from '../Markdown/Markdown.factory';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap);

export const MarkdownBasic: React.StatelessComponent<MarkdownComponentProps> = createComponent();
