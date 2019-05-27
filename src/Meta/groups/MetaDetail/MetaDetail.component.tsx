import * as React from 'react';

import { NodeChildren } from '../../../Shared/blocks/NodeChildren/NodeChildren.component';
import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeParent } from '../../../Shared/blocks/NodeParent/NodeParent.component';
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
      <NodeParent parent={meta.meta.links.parent} />
      <h1 className="page-title">{meta.title}</h1>
    </>
  );
  const footer = <NodeMeta node={meta} showUpdated={true} />;
  return (
    <BaseDetail className="meta-detail" node={meta} header={header} footer={footer}>
      <NodeMarkdown node={meta} className="meta-abstract">
        {meta.abstract}
      </NodeMarkdown>
      <NodeChildren children={meta.meta.links.children} />
      <NodeMarkdown node={meta} className="meta-content">
        {meta.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
