import { Node } from './Shared/types/Node.models';

import { PageNode } from './Shared/types/Page.models';
import { loadPages } from './Site/pages.source';

import { loadPosts } from './Blog/posts.source';
import { PostNode } from './Blog/types/Post.models';

import { loadMetas } from './Meta/metas.source';
import { MetaNode } from './Meta/types/Meta.models';

import { generateTags, loadTags } from './Taxonomy/tags.source';
import { TagNode } from './Taxonomy/types/Tag.models';

import { generateMedias, loadMedias } from './Media/medias.source';
import { MediaNode } from './Media/types/Media.models';
import { collectAssets } from './Shared/lib/assets';

const debug = (nodes: Node[]) => {
  // tslint:disable
  console.log(`----- loaded ${nodes.length} nodes`);
  nodes.forEach(node => {
    console.log(node.path, node.meta.template);
    if (process.env.DEBUG_NODES === node.path) console.log(node);
  });
  // tslint:enable
};

export interface Sources {
  nodes: Node[];
  pages: PageNode[];
  posts: PostNode[];
  metas: MetaNode[];
  tags: TagNode[];
  medias: MediaNode[];
}

export const loadSources = async (): Promise<Sources> => {
  const results = await Promise.all([loadPages(), loadPosts(), loadMetas(), loadTags(), loadMedias()]);
  const [pages, posts, metas, loadedTags, loadedMedias] = results;

  const allNodes: Node[] = [...pages, ...posts, ...metas, ...loadedMedias];

  const tags = generateTags(loadedTags, [...allNodes, ...loadedTags]);
  allNodes.push(...tags);

  const assets = collectAssets(allNodes);

  // process assets
  // add assets to node.meta.assets

  const medias = generateMedias(loadedMedias, assets);
  allNodes.push(...medias);

  if (process.env.DEBUG_NODES) {
    debug(allNodes);
  }

  return {
    nodes: allNodes,
    pages,
    posts,
    metas,
    tags,
    medias
  };
};
