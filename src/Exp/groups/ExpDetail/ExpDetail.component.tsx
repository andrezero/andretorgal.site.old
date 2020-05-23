import * as React from 'react';

import { NodeChildren } from '../../../Shared/blocks/NodeChildren/NodeChildren.component';
import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { ExpNode } from '../../types/Exp.models';

import './ExpDetail.scss';

interface Props {
  exp: ExpNode;
}

export const ExpDetail: React.StatelessComponent<Props> = ({ exp }) => {
  const header = (
    <>
      <h1 className="page-title">{exp.title}</h1>
      <NodeMarkdown node={exp} className="exp-abstract">
        {exp.abstract}
      </NodeMarkdown>
      <NodeChildren>{exp.meta.links.children}</NodeChildren>
    </>
  );
  const footer = <NodeMeta node={exp} showUpdated={true} />;
  return (
    <BaseDetail className="exp-detail" node={exp} header={header} footer={footer}>
      <NodeMarkdown node={exp} className="exp-content">
        {exp.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
