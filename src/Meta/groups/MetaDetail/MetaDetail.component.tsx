import * as React from 'react';

import { NodeChildren } from '../../../Shared/blocks/NodeChildren/NodeChildren.component';
import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeLastUpdated } from '../../../Shared/elements/NodeLastUpdated/NodeLastUpdated.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { MetaNode } from '../../types/Meta.models';

import './MetaDetail.scss';

interface Props {
  meta: MetaNode;
}

export const MetaDetail: React.StatelessComponent<Props> = ({ meta }) => {
  const header = (
    <>
      <h1 className="page-title">{meta.title}</h1>
      <NodeLastUpdated node={meta} />
      <NodeMarkdown node={meta} className="meta-abstract">
        {meta.abstract}
      </NodeMarkdown>
      <NodeChildren>{meta.meta.links.children}</NodeChildren>
    </>
  );
  const footer = <NodeMeta node={meta} showUpdated={true} />;
  return (
    <BaseDetail className="meta-detail" node={meta} header={header} footer={footer}>
      <NodeMarkdown node={meta} className="meta-content">
        {meta.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
