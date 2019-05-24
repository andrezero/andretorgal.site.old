import * as React from 'react';

import { BaseListItem } from '../../../Shared/blocks/BaseListItem/BaseListItem.component';
import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
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
      <Tag className="node-title">
        <Link href={post.path}>{post.title}</Link>
      </Tag>
    </>
  );
  return (
    <BaseListItem className="page-list-item" node={post} header={header} footer={footer}>
      <MarkdownBase>{post.abstract}</MarkdownBase>
      <ReadMore path={post.path} />
    </BaseListItem>
  );
};
