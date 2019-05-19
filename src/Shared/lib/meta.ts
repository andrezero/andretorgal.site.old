import { strip } from './markdown';

import { DocMeta, NodeMeta, OpenGraphMeta } from '../types/Node.models';

export const baseMeta = (
  origin: string,
  template: string,
  classes: string,
  title: string,
  created: Date,
  updated: Date
): NodeMeta => {
  const doc: DocMeta[] = [];
  const og: OpenGraphMeta[] = [];

  const createdStr = created.toISOString();
  const updatedStr = updated.toISOString();

  og.push({ property: 'og:title', content: title });
  doc.push({ name: 'created', value: createdStr });
  if (createdStr !== updatedStr) {
    doc.push({ name: 'updated', value: updatedStr });
  }

  return {
    origin,
    template,
    classes,
    doc,
    og,
    links: {},
    assets: []
  };
};

// og.push({ property: 'og:type', content: (data && data.type) || 'article' });

// let author = 'André Torgal';
// if (data && data.author) {
//   author = data.author;
// }

// let description =
//   'My name is André Torgal and I was born in 1973 in Lisbon, Portugal. This is my website, a place where I can blog some thoughts and run a few experiments. Learn more about me, my work, and other stuff I have been up to.';
// if (data && data.description) {
//   description = data.description;
// } else if (abstract) {
//   description = strip(abstract); // @todo truncate
// } else if (content) {
//   description = strip(content); // @todo truncate
// }

// doc.push({ name: 'description', value: description });
// doc.push({ name: 'author', value: author });

// og.push({ property: 'og:url', content: data && data.url }); // @todo prefix

// og.push({ property: 'og:description', content: description });
// og.push({ property: 'og:image', content: data && data.image }); // @todo extract
