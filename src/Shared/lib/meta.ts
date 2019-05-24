import { resolve as urlResolve } from 'url';

import { stripAll } from './markdown';

import { AssetLocator } from '../types/Asset.models';
import { DocMeta, Node, NodeData, NodeMeta, OpenGraphMeta } from '../types/Node.models';

export const newMeta = (
  sourceType: string,
  sourceRef: string,
  template: string,
  classes: string,
  title: string,
  notes: string,
  created: Date,
  updated: Date,
  data?: NodeData
): NodeMeta => {
  const doc: DocMeta[] = [];
  const og: OpenGraphMeta[] = [];

  const createdStr = created.toISOString();
  const updatedStr = updated.toISOString();

  og.push({ property: 'og:title', content: title });
  doc.push({ name: 'twitter:title', content: title });

  doc.push({ name: 'created', content: createdStr });
  if (createdStr !== updatedStr) {
    doc.push({ name: 'updated', content: updatedStr });
  }

  return {
    source: {
      type: sourceType,
      ref: sourceRef
    },
    data: data || {},
    template,
    notes,
    classes,
    doc,
    og,
    links: {},
    assets: []
  };
};

export const metaType = (node: Node, def: string) => {
  const { meta } = node;
  const { data, og } = meta;

  const type = data.type || def;

  og.push({ property: 'og:type', content: type });
};

export const metaDescription = (node: Node, defaultDescription: string) => {
  const { abstract, content, meta } = node;
  const { data, doc, og } = meta;

  let description = defaultDescription;

  if (data.description) {
    description = data.description;
  } else if (abstract) {
    description = stripAll(abstract); // @todo truncate
  } else if (content) {
    description = stripAll(content); // @todo truncate
  }

  doc.push({ name: 'description', content: description });
  doc.push({ name: 'twitter:description', content: description });
  og.push({ property: 'og:description', content: description });
};

export const metaAuthor = (node: Node, defaultAuthor: string) => {
  const { meta } = node;
  const { data, doc } = meta;

  const author = data.author || defaultAuthor;

  doc.push({ name: 'author', content: author });
};

export const metaUrl = (node: Node, baseUrl: string) => {
  const { meta } = node;
  const { og } = meta;

  const url = urlResolve(baseUrl, node.path);

  og.push({ property: 'og:url', content: url });
};

export const metaKeywords = (node: Node) => {
  const { meta } = node;
  const { doc } = meta;

  if (node.tags) {
    doc.push({ name: 'keywords', content: node.tags.join(', ') });
  }
};

export const metaImage = (node: Node, locator: AssetLocator, defaultImage: string) => {
  const { meta } = node;
  const { assets, data, doc, og } = meta;

  let image = defaultImage;

  if (data.image) {
    image = data.image;
  } else if (assets.length) {
    image = locator.url(assets[0], 'image.medium');
  }

  og.push({ property: 'og:image', content: image });
  doc.push({ name: 'twitter:image:src', content: image });
};
