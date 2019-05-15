import * as React from 'react';

import { NodeMeta } from '../../../Shared/blocks/NodeMeta/NodeMeta.component';
import { MarkdownBasic } from '../../../Shared/elements/MarkdownBasic/MarkdownBasic.component';

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
        <MarkdownBasic>{tag.abstract}</MarkdownBasic>
        <MarkdownBasic>{tag.content}</MarkdownBasic>
      </div>
      <footer>
        <NodeMeta node={tag} />
      </footer>
    </article>
  );
};
