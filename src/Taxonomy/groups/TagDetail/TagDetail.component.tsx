import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { TagCount } from '../../elements/TagCount/TagCount.component';
import { TagNode } from '../../types/Tag.models';

import './TagDetail.scss';

interface Props {
  tag: TagNode;
}

export const TagDetail: React.StatelessComponent<Props> = ({ tag }) => {
  const header = (
    <>
      <TagCount count={tag.count} />
      <h1 className="page-title">{tag.title}</h1>
    </>
  );
  const footer = <NodeMeta node={tag} />;
  return (
    <BaseDetail className="tag-detail" node={tag} header={header} footer={footer}>
      <NodeMarkdown node={tag} className="tag-abstract">
        {tag.abstract}
      </NodeMarkdown>
      <NodeMarkdown node={tag} className="tag-content">
        {tag.content}
      </NodeMarkdown>
    </BaseDetail>
  );
};
