import * as markdown from '../../../Shared/lib/markdown';

import { MarkdownComponentProps, markdownFactory } from '../../../Shared/elements/Markdown/Markdown.factory';

const createComponent = () => markdownFactory(markdown.strippedLinks(), {});

export const PostAbstract: React.StatelessComponent<MarkdownComponentProps> = createComponent();
