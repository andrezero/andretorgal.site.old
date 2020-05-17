import * as React from 'react';

import * as markdown from '../../lib/markdown';

import { Node } from '../../types/Node.models';
import { NodeImg } from '../NodeImg/NodeImg.component';

import { basicComponentMap, MarkdownComponentProps, markdownFactory } from '../Markdown/Markdown.factory';

import './NodeMarkdown.scss';

interface NodeMarkdownProps {
  node: Node;
  strip?: boolean;
}

type Props = MarkdownComponentProps & NodeMarkdownProps;

const withNodeAndProfiles = (WrappedComponent: React.ComponentType, node: Node): React.ComponentType => {
  const WithNodeAndProfiles = (props: any) => {
    const profiles = ['image.small', 'image.medium', 'image.large'];
    return <WrappedComponent node={node} profiles={profiles} {...props} />;
  };
  return WithNodeAndProfiles;
};

export const NodeMarkdown: React.StatelessComponent<Props> = ({ node, strip, children, className, ...rest }: Props) => {
  const assetImgWithNode = withNodeAndProfiles(NodeImg, node);
  const componentMap = { ...basicComponentMap, img: assetImgWithNode };
  const classes = ['node-markdown'];
  if (className) {
    classes.push(className);
  }
  if (strip) {
    const MarkdownStripped = markdownFactory(markdown.stripLinks(), basicComponentMap);
    return (
      <MarkdownStripped className={classes.join(' ')} {...rest}>
        {children}
      </MarkdownStripped>
    );
  } else {
    const MarkdownFull = markdownFactory(markdown.basic(), componentMap);
    return (
      <MarkdownFull className={classes.join(' ')} {...rest}>
        {children}
      </MarkdownFull>
    );
  }
};
