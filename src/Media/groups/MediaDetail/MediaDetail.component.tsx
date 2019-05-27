import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { MediaNode } from '../../types/Media.models';
import { ImageDetail } from '../ImageDetail/ImageDetail.component';

import './MediaDetail.scss';

interface Props {
  media: MediaNode;
}

const map = {
  image: ImageDetail
};

const DefaultDetail: React.StatelessComponent<Props> = ({ media }) => {
  const header = (
    <>
      <NodeDate date={media.created} />
      <h1 className="page-title">{media.title}</h1>
    </>
  );
  const footer = <NodeMeta node={media} />;

  return (
    <BaseDetail className="media-detail media-default" node={media} header={header} footer={footer}>
      <NodeMarkdown node={media}>{media.abstract}</NodeMarkdown>
      <NodeMarkdown node={media}>{media.content}</NodeMarkdown>
    </BaseDetail>
  );
};

export const MediaDetail: React.StatelessComponent<Props> = ({ media }) => {
  const Component = map[media.meta.asset.type];
  if (Component) {
    return <Component media={media} />;
  }
  return <DefaultDetail media={media} />;
};
