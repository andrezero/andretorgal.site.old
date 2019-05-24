import * as React from 'react';

import { BaseListItem } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';
import { Node } from '../../../Shared/types/Node.models';

import { PostListItem } from '../../../Blog/blocks/PostListItem/PostListItem.component';
import { MetaListItem } from '../../../Meta/blocks/MetaListItem/MetaListItem.component';
import { PageListItem } from '../../../Site/blocks/PageListItem/PageListItem.component';
import { TagListItem } from '../../../Taxonomy/blocks/TagListItem/TagListItem.component';

import './NodeListItem.scss';

interface Props {
  node: Node;
  level?: number;
  footer?: React.ReactNode;
}

const map = {
  page: PageListItem,
  post: PostListItem,
  meta: MetaListItem,
  tag: TagListItem
};

const DefaultListItem: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <Tag className="node-title">
      <Link href={node.path}>{node.title}</Link>
    </Tag>
  );
  return (
    <BaseListItem className="node-list-item" node={node} header={header} footer={footer}>
      <MarkdownBase>{node.abstract}</MarkdownBase>
      <ReadMore path={node.path} />
    </BaseListItem>
  );
};

export const NodeListItem: React.StatelessComponent<Props> = ({ node, level = 2, footer }) => {
  const Component = map[node.type];
  if (Component) {
    return <Component node={node} level={level} footer={footer} />;
  }
  return <DefaultListItem node={node} level={level} footer={footer} />;
};
