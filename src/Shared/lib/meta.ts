import { resolve as urlResolve } from 'url';

import { stripAll } from './markdown';

import { AssetLocator } from '../types/Asset.models';
import {
  DocMeta,
  DocMetaList,
  Node,
  NodeData,
  NodeMeta,
  NodeMetaDefaults,
  OgMetaList,
  OpenGraphMeta
} from '../types/Node.models';

const metaType = (node: Node, def: string) => {
  const { meta } = node;
  const { data, og } = meta;

  const type = data.type || def;

  og['og:type'] = type;
};

const metaDescription = (node: Node, defaultDescription: string) => {
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

  doc.description = description;
  doc['twitter:description'] = description;
  og['og:description'] = description;
};

const metaAuthor = (node: Node, defaultAuthor: string) => {
  const { meta } = node;
  const { data, doc } = meta;

  const author = data.author || defaultAuthor;

  doc.author = author;
};

const metaUrl = (node: Node, baseUrl: string, canonicalUrl: string) => {
  const { meta } = node;
  const { doc, og } = meta;

  const url = urlResolve(baseUrl, node.path);
  const canonical = urlResolve(canonicalUrl, node.path);

  og['og:url'] = url;
  doc.canonical = canonical;
};

const metaKeywords = (node: Node) => {
  const { meta } = node;
  const { doc } = meta;

  if (node.tags.length) {
    doc.keywords = node.tags.join(', ');
  }
};

const metaImage = (node: Node, locator: AssetLocator, defaultImage: string) => {
  const { meta } = node;
  const { assets, data, doc, og } = meta;

  let image = defaultImage;

  if (data.image) {
    image = data.image;
  } else if (assets.length) {
    image = locator.url(assets[0], 'image.medium');
  }

  og['og:image'] = image;
  doc['twitter:image:src'] = image;
};

const sortDocMetaList = (list: DocMetaList): DocMetaList => {
  return list.sort((a: DocMeta, b: DocMeta) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
};

const sortOgMetaList = (list: OgMetaList): OgMetaList => {
  return list.sort((a: OpenGraphMeta, b: OpenGraphMeta) => {
    if (a.property > b.property) {
      return 1;
    } else if (a.property < b.property) {
      return -1;
    }
    return 0;
  });
};

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
  const doc: DocMeta = {};
  const og: OpenGraphMeta = {};

  const createdStr = created.toISOString();
  const updatedStr = updated.toISOString();

  og['og:title'] = title;
  doc['twitter:title'] = title;

  doc.created = createdStr;
  if (createdStr !== updatedStr) {
    doc.updated = updatedStr;
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

export const resolveNodeMeta = (
  node: Node,
  type: string,
  assetLocator: AssetLocator,
  metaDefaults: NodeMetaDefaults
) => {
  metaType(node, type);
  metaAuthor(node, metaDefaults.author);
  metaDescription(node, metaDefaults.description);
  metaUrl(node, metaDefaults.baseUrl, metaDefaults.canonicalUrl);
  metaKeywords(node);
  metaImage(node, assetLocator, metaDefaults.image);
};

export const docMetaToArray = (doc: DocMeta): DocMetaList => {
  const list = Object.keys(doc)
    .filter(key => !!doc[key])
    .map(key => ({ name: key, content: doc[key] }));
  return sortDocMetaList(list);
};

export const ogMetaToArray = (og: OpenGraphMeta): OgMetaList => {
  const list = Object.keys(og)
    .filter(key => !!og[key])
    .map(key => ({ property: key, content: og[key] }));
  return sortOgMetaList(list);
};
