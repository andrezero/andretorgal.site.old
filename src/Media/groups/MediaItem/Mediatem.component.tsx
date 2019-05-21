import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { MarkdownBase } from '../../../Shared/elements/MarkdownBase/MarkdownBase.component';
import { ReadMore } from '../../../Shared/elements/ReadMore/ReadMore.component';

import { ImageItem } from '../ImageItem/ImageItem.component';

import { MediaNode } from '../../types/Media.models';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeDate } from '../../../Shared/elements/NodeDate/NodeDate.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';

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
