import { Attacher, Transformer } from 'unified';
import unified from 'unified';
import * as Unist from 'unist';
import visit from 'unist-util-visit';

import { parser as htmlParser } from './html';

const findInHtml = (html: string): Unist.Node[] => {
  const tree = htmlParser().parse(html);

  const processor = unified().use(findImages);
  const result = processor.runSync(tree).children;

  return result as Unist.Node[];
};

export const findImages: Attacher = () => {
  const transformer: Transformer = (tree: Unist.Node): Unist.Node => {
    const images: any[] = [];

    visit(tree, 'html', (node: any) => {
      const nodes = findInHtml(node.value);
      images.push(...nodes);
    });

    visit(tree, 'image', (node: any) => {
      images.push(node);
    });

    const children = tree.children as any[];
    children.splice(0);
    children.push(...images);

    return tree;
  };
  return transformer;
};
