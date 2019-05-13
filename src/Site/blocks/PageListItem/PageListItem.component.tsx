import * as React from 'react';

import { BaseListItem } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';

import { PageNode } from '../../../Shared/types/Page.models';

import './PageListItem.scss';

interface Props {
  node: PageNode;
  level?: number;
  footer?: React.ReactNode;
}

export const PageListItem: React.StatelessComponent<Props> = ({ node: post, level = 2, footer }) => {
  const Tag = ('h' + level) as React.ElementType;
  const header = (
    <>
      <NodeDate date={post.created} />
      <Tag className="node-title">
        <Link href={post.path}>{post.title}</Link>
      </Tag>
    </>
  );
  return (
    <BaseListItem className="page-list-item" header={header} footer={footer}>
      <MarkdownBasic>{post.abstract}</MarkdownBasic>
      <ReadMore path={post.path} />
    </BaseListItem>
  );
};
