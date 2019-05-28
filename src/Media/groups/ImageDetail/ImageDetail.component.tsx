import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeImg } from '../../../Shared/elements/NodeImg/NodeImg.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { BaseDetail } from '../../../Shared/groups/BaseDetail/BaseDetail.component';

import { MediaNode } from '../../types/Media.models';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { AssetSourceNode } from '../../../Shared/types/Asset.models';
import './ImageDetail.scss';

interface Props {
  media: MediaNode;
}

const mediaUsedIn = (media: MediaNode) => {
  return media.meta.asset.sources.map(source => {
    const node = (source as AssetSourceNode).node;
    return (
      <li key={node.link.path}>
        <Link href={node.link.path}>{node.link.title}</Link>
      </li>
    );
  });
};

export const ImageDetail: React.StatelessComponent<Props> = ({ media }) => {
  const profiles = ['image.small', 'image.medium', 'image.large'];
  const usedIn = mediaUsedIn(media);
  const header = (
    <>
      <NodeDate date={media.created} />
      <h1 className="page-title">{media.title}</h1>
    </>
  );
  const footer = (
    <>
      <NodeMeta node={media} />
      {usedIn.length && (
        <div className="used-in">
          <h3>Used in {usedIn.length} items</h3>
          <ul>{usedIn}</ul>
        </div>
      )}
    </>
  );

  return (
    <BaseDetail className="image-detail" node={media} header={header} footer={footer}>
      <NodeImg node={media} src={media.meta.asset.url} profiles={profiles} />
      <NodeMarkdown node={media}>{media.abstract}</NodeMarkdown>
      <NodeMarkdown node={media}>{media.content}</NodeMarkdown>
    </BaseDetail>
  );
};
