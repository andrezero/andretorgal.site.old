import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeImg } from '../../../Shared/elements/NodeImg/NodeImg.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { MediaNode } from '../../types/Media.models';

import './ImageDetail.scss';

interface Props {
  media: MediaNode;
}

export const ImageDetail: React.StatelessComponent<Props> = ({ media }) => {
  const profiles = ['image.small', 'image.medium', 'image.large'];
  const header = (
    <>
      <NodeDate date={media.created} />
      <h1 className="page-title">{media.title}</h1>
    </>
  );
  const footer = <NodeMeta node={media} />;

  return (
    <BaseDetail className="image-detail" node={media} header={header} footer={footer}>
      <NodeImg node={media} src={media.meta.asset.url} profiles={profiles} />
      <NodeMarkdown node={media}>{media.abstract}</NodeMarkdown>
      <NodeMarkdown node={media}>{media.content}</NodeMarkdown>
    </BaseDetail>
  );
};
