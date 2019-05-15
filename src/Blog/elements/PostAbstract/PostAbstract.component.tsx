import * as React from 'react';

import * as markdown from '../../../Shared/lib/markdown';

import { MarkdownComponentProps, markdownFactory } from '../../../Shared/elements/Markdown/Markdown.factory';

import './PostAbstract.scss';

interface PostAbstractProps {
  strip?: boolean;
}

type Props = MarkdownComponentProps & PostAbstractProps;

const createComponent = () => {
  const MarkdownStripped = markdownFactory(markdown.strippedLinks(), {}, 'post-abstract');
  const MarkdownFull = markdownFactory(markdown.basic(), {}, 'post-abstract');
  return ({ strip, children, ...rest }: Props) => {
    return strip ? (
      <MarkdownStripped {...rest}>{children}</MarkdownStripped>
    ) : (
      <MarkdownFull {...rest}>{children}</MarkdownFull>
    );
  };
};

export const PostAbstract: React.StatelessComponent<MarkdownComponentProps> = createComponent();
