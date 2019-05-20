import { Attacher, Transformer } from 'unified';
import * as Unist from 'unist';
import visit from 'unist-util-visit';

export const findImages: Attacher = () => {
  const transformer: Transformer = (tree: Unist.Node): Unist.Node => {
    const images: any[] = [];
    visit(tree, 'element', (node: any) => {
      const { href, alt, title } = node.properties;
      if (node.tagName !== 'img' || !href) {
        return;
      }
      const image = {
        type: 'image',
        url: href,
        alt,
        title
      };
      images.push(image);
    });
    const children = tree.children as any[];
    children.splice(0);
    children.push(...images);
    return tree;
  };
  return transformer;
};
