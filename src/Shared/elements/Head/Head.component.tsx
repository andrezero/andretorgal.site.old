import * as React from 'react';
import { Head as ReactStaticHead, useSiteData } from 'react-static';

import { docMetaToArray, ogMetaToArray } from '../../lib/meta';
import { DocMeta, Node } from '../../types/Node.models';

interface Props {
  node: Node;
  title?: string;
  meta?: DocMeta;
}

export const Head: React.StatelessComponent<Props> = ({ node, title, meta = {} }) => {
  const siteData = useSiteData();
  const allDocMeta = { ...(siteData.metaTags as DocMeta), ...node.meta.doc, ...meta };
  const allMeta = [...docMetaToArray(allDocMeta), ...ogMetaToArray(node.meta.og)];
  return <ReactStaticHead title={title || node.title} meta={allMeta} />;
};
