import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { PageNode } from '../../../Shared/types/Page.models';

import './PageDetail.scss';

interface Props {
  page: PageNode;
}

export const PageDetail: React.StatelessComponent<Props> = ({ page }) => {
  const header = <h1 className="page-title">{page.title}</h1>;
  const footer = <NodeMeta node={page} />;
  return (
    <BaseDetail className="page-detail" node={page} header={header} footer={footer}>
      <NodeMarkdown node={page} className="page-content">
        {page.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
