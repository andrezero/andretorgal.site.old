import * as React from 'react';

import * as markdown from '../../lib/markdown';

import { AssetImg } from '../../../Assets/elements/AssetImg/AssetImg.component';
import { Node } from '../../types/Node.models';

import { basicComponentMap, MarkdownComponentProps, markdownFactory } from '../Markdown/Markdown.factory';

import './NodeMarkdown.scss';

interface NodeMarkdownProps {
  node: Node;
  strip?: boolean;
}

type Props = MarkdownComponentProps & NodeMarkdownProps;

const withNode = (WrappedComponent: React.ComponentType, node: Node): React.ComponentType => (props: any) => {
  return <WrappedComponent node={node} {...props} />;
};

export const NodeMarkdown: React.StatelessComponent<Props> = ({
  node,
  strip,
  children,
  className = 'node-markdown',
  ...rest
}: Props) => {
  const assetImgWithNode = withNode(AssetImg, node);
  const componentMap = { ...basicComponentMap, img: assetImgWithNode };
  const MarkdownStripped = markdownFactory(markdown.stripLinks(), basicComponentMap);
  const MarkdownFull = markdownFactory(markdown.basic(), componentMap);
  return strip ? (
    <MarkdownStripped className={className} {...rest}>
      {children}
    </MarkdownStripped>
  ) : (
    <MarkdownFull className={className} {...rest}>
      {children}
    </MarkdownFull>
  );
};
