import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { NodeNotes } from '../../../Shared/elements/NodeNotes/NodeNotes.component';

import { MediaNode } from '../../types/Media.models';
import { ImageItem } from '../ImageItem/ImageItem.component';

import './MediaItem.scss';

interface Props {
  media: MediaNode;
}

const map = {
  image: ImageItem
};

const DefaultItem: React.StatelessComponent<Props> = ({ media }) => {
  return (
    <section className="container">
      <article className="media-item">
        <header>
          <NodeDate date={media.created} />
          <h1 className="page-title">{media.title}</h1>
        </header>
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

export const MediaItem: React.StatelessComponent<Props> = ({ media }) => {
  const Component = map[media.meta.asset.type];
  if (Component) {
    return <Component media={media} />;
  }
  return <DefaultItem media={media} />;
};
