import { NodeMeta } from '../types/Node.models';

export const makeMeta = (data?: any) => {
  const meta: NodeMeta = [];
  meta.push({ name: 'description', value: data && data.abstract });
  meta.push({ name: 'created', value: data && data.created });
  meta.push({ name: 'author', value: data && data.author });
  meta.push({ property: 'og:url', content: data && data.url });
  meta.push({ property: 'og:type', content: (data && data.type) || 'article' });
  meta.push({ property: 'og:title', content: data && data.title });
  meta.push({ property: 'og:description', content: data && data.abstract });
  meta.push({ property: 'og:image', content: data && data.image });
  return meta;
};
