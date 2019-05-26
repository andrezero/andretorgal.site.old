import * as React from 'react';
import { Head as ReactStaticHead, useSiteData } from 'react-static';

import { DocMeta, Node } from '../../types/Node.models';

interface Props {
  node: Node;
  title?: string;
  meta?: DocMeta[];
}

const sortMeta = (a: DocMeta, b: DocMeta) => {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  }
  return 0;
};

export const Head: React.StatelessComponent<Props> = ({ node, title, meta = [] }) => {
  const siteData = useSiteData();
  const siteMetaTags = siteData.metaTags;
  const sorted = [...siteMetaTags, ...node.meta.doc, ...meta].sort(sortMeta);
  const allMeta = [...sorted, ...node.meta.og];
  return <ReactStaticHead title={title || node.title} meta={allMeta} />;
};
