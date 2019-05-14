import { NodeMeta } from '../types/Node.models';

import { strip } from './markdown';

export const makeMeta = (data?: any, abstract?: string, content?: string) => {
  const meta: NodeMeta = [];

  let author = 'André Torgal';
  if (data && data.author) {
    author = data.author;
  }

  let description =
    'My name is André Torgal and I was born in 1973 in Lisbon, Portugal. This is my website, a place where I can blog some thoughts and run a few experiments. Learn more about me, my work, and other stuff I have been up to.';
  if (data && data.description) {
    description = data.description;
  } else if (abstract) {
    description = strip(abstract);
  } else if (content) {
    description = strip(content);
  }

  meta.push({ name: 'description', value: description });
  meta.push({ name: 'created', value: data && data.created });
  meta.push({ name: 'author', value: author });
  meta.push({ property: 'og:url', content: data && data.url });
  meta.push({ property: 'og:type', content: (data && data.type) || 'article' });
  meta.push({ property: 'og:title', content: data && data.title });
  meta.push({ property: 'og:description', content: description });
  meta.push({ property: 'og:image', content: data && data.image });
  return meta;
};
