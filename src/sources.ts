import { resolveNodeMeta } from './Shared/lib/meta';
import { AssetLocator, AssetPreset } from './Shared/types/Asset.models';
import { Node, NodeMetaDefaults } from './Shared/types/Node.models';

import { loadPages } from './Site/pages.source';
import { PageNode } from './Shared/types/Page.models';

import { loadPosts } from './Blog/posts.source';
import { PostNode } from './Blog/types/Post.models';

import { loadMetas } from './Meta/metas.source';
import { MetaNode } from './Meta/types/Meta.models';

import { loadExps } from './Exp/exps.source';
import { ExpNode } from './Exp/types/Exp.models';

import { generateTagsFromNodes, loadTags } from './Taxonomy/tags.source';
import { TagNode } from './Taxonomy/types/Tag.models';

import { attachAssets, generateAssetsFromNodes, processAssets } from './Assets/assets.source';

import { generateMediasFromNodes, loadMedias } from './Media/medias.source';
import { MediaNode } from './Media/types/Media.models';

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
  exps: ExpNode[];
  tags: TagNode[];
  medias: MediaNode[];
}

export const loadSources = async (
  stage: string,
  assetLocator: AssetLocator,
  assetPresets: AssetPreset[],
  metaDefaults: NodeMetaDefaults
): Promise<Sources> => {
  const results = await Promise.all([
    loadPages(stage),
    loadPosts(stage),
    loadMetas(stage),
    loadExps(stage),
    loadTags(stage),
    loadMedias(stage)
  ]);
  const [pages, posts, metas, exps, loadedTags, loadedMedias] = results;

  const nodesWithTags: Node[] = [...pages, ...posts, ...metas, ...loadedTags, ...loadedMedias];
  const tags = generateTagsFromNodes(stage, loadedTags, nodesWithTags);

  const nodesWithAssets: Node[] = [...pages, ...posts, ...metas, ...loadedMedias, ...tags];
  const assets = generateAssetsFromNodes(stage, nodesWithAssets);

  await processAssets(stage, assets, assetLocator, assetPresets);

  const medias = generateMediasFromNodes(loadedMedias, assets);

  const sources: Sources = {
    nodes: [...pages, ...posts, ...metas, ...exps, ...medias, ...tags],
    pages,
    posts,
    metas,
    exps,
    tags,
    medias
  };

  attachAssets(stage, assets, sources.nodes);

  sources.nodes.forEach(node => resolveNodeMeta(node, 'article', assetLocator, metaDefaults));

  if (process.env.DEBUG_NODES) {
    debug(sources.nodes);
  }

  return sources;
};
