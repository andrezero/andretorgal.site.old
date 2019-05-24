import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { NodeMarkdown } from '../../../Shared/elements/NodeMarkdown/NodeMarkdown.component';
import { NodeNotes } from '../../../Shared/elements/NodeNotes/NodeNotes.component';

import { TagCount } from '../../elements/TagCount/TagCount.component';
import { TagNode } from '../../types/Tag.models';

import './TagItem.scss';

interface Props {
  tag: TagNode;
}

export const TagItem: React.StatelessComponent<Props> = ({ tag }) => {
  return (
    <article className="tag-item">
      <div className="tag-contents">
        <header>
          <TagCount count={tag.count} />
          <h1 className="page-title">{`#${tag.title}`}</h1>
        </header>
        <NodeMarkdown node={tag}>{tag.abstract}</NodeMarkdown>
        <NodeMarkdown node={tag}>{tag.content}</NodeMarkdown>
      </div>
      <footer>
        {tag.meta.notes && <NodeNotes node={tag} />}
        <NodeMeta node={tag} />
      </footer>
    </article>
  );
};
