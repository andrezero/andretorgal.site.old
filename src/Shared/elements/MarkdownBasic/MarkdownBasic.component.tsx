import * as markdown from '../../lib/markdown';

import { basicComponentMap, MarkdownComponentProps, markdownFactory } from '../Markdown/Markdown.factory';

import './MarkdownBasic.scss';

const createComponent = () => markdownFactory(markdown.basic(), basicComponentMap, 'markdown-basic');

export const MarkdownBasic: React.StatelessComponent<MarkdownComponentProps> = createComponent();
