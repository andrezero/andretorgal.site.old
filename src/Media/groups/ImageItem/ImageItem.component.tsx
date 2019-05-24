import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeImg } from '../../../Shared/elements/NodeImg/NodeImg.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { NodeNotes } from '../../../Shared/elements/NodeNotes/NodeNotes.component';

import { MediaNode } from '../../types/Media.models';

import './ImageItem.scss';

interface Props {
  media: MediaNode;
  level?: number;
  footer?: React.ReactNode;
}

export const ImageItem: React.StatelessComponent<Props> = ({ media, level = 2, footer }) => {
  const profiles = ['image.small', 'image.medium', 'image.large'];
  return (
    <section className="container">
      <article className="media-image-item">
        <header>
          <NodeDate date={media.created} />
          <h1 className="page-title">{media.title}</h1>
        </header>
        <NodeImg node={media} src={media.meta.asset.url} profiles={profiles} />
        <NodeMarkdown node={media}>{media.abstract}</NodeMarkdown>
        <NodeMarkdown node={media}>{media.content}</NodeMarkdown>
      </article>
      <footer>
        {media.meta.notes && <NodeNotes node={media} />}
        <NodeMeta node={media} />
      </footer>
    </section>
  );
};
