import * as React from 'react';
import { Head as ReactStaticHead } from 'react-static';

import { DocMeta, Node, OpenGraphMeta } from '../../types/Node.models';

interface Props {
  node: Node;
  title?: string;
  meta?: Array<DocMeta | OpenGraphMeta>;
}

export const Head: React.StatelessComponent<Props> = ({ node, title, meta = [] }) => {
  const allMeta = [...node.meta.doc, ...node.meta.og, ...meta];
  return <ReactStaticHead title={title || node.title} meta={allMeta} />;
};
