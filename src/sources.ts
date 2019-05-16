import { Node } from './Shared/types/Node.models';
import { Route } from './Shared/types/Route.models';

import { PageNode } from './Shared/types/Page.models';
import { loadPages } from './Site/pages.source';

import { loadPosts } from './Blog/posts.source';
import { PostNode } from './Blog/types/Post.models';

import { loadMetas } from './Meta/metas.source';
import { MetaNode } from './Meta/types/Meta.models';

import { collectAssets, newAssetNode } from './Shared/lib/assets';
import { generateTags, loadTags } from './Taxonomy/tags.source';
import { TagNode } from './Taxonomy/types/Tag.models';

const debug = (nodes: Node[]) => {
  // tslint:disable
  console.log(`----- loaded ${nodes.length} nodes`);
  nodes.forEach(node => {
    console.log(node.path, node.meta.template);
    if (process.env.DEBUG_SOURCES === node.path) console.log(node);
  });
  // tslint:enable
};

export interface Sources {
  nodes: Node[];
  pages: PageNode[];
  posts: PostNode[];
  metas: MetaNode[];
  tags: TagNode[];
}

export const loadSources = async (): Promise<Sources> => {
  const results = await Promise.all([loadPages(), loadPosts(), loadMetas(), loadTags()]);
  const [pages, posts, metas, loadedTags] = results;

  const allNodes: Node[] = [...pages, ...posts, ...metas];

  const allTags = generateTags(loadedTags, [...allNodes, ...loadedTags]);
  allNodes.push(...allTags);

  const assets = collectAssets(allNodes);

  // add assets to node.meta.assets

  const assetNodes = assets.map(newAssetNode);
  allNodes.push(...assetNodes);

  if (process.env.DEBUG_SOURCES) {
    debug(allNodes);
  }

  return {
    nodes: allNodes,
    pages,
    posts,
    metas,
    tags: allTags
  };
};
