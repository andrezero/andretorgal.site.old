import { AssetLocator, AssetPreset } from './Shared/types/Asset.models';
import { Node, NodeMetaDefaults } from './Shared/types/Node.models';

import { PageNode } from './Shared/types/Page.models';
import { loadPages } from './Site/pages.source';

import { loadPosts } from './Blog/posts.source';
import { PostNode } from './Blog/types/Post.models';

import { loadMetas } from './Meta/metas.source';
import { MetaNode } from './Meta/types/Meta.models';

import { generateTags, loadTags } from './Taxonomy/tags.source';
import { TagNode } from './Taxonomy/types/Tag.models';

import { attachAssets, loadAssets, processAssets } from './Assets/assets.source';

import { generateMedias, loadMedias } from './Media/medias.source';
import { MediaNode } from './Media/types/Media.models';
import { metaAuthor, metaDescription, metaImage, metaKeywords, metaType, metaUrl } from './Shared/lib/meta';

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
    loadTags(stage),
    loadMedias(stage)
  ]);
  const [pages, posts, metas, loadedTags, loadedMedias] = results;

  const nodesWithTags: Node[] = [...pages, ...posts, ...metas, ...loadedTags, ...loadedMedias];
  const tags = generateTags(stage, loadedTags, nodesWithTags);

  const nodesWithAssets: Node[] = [...pages, ...posts, ...metas, ...loadedMedias, ...tags];
  const assets = loadAssets(stage, nodesWithAssets);

  await processAssets(stage, assets, assetLocator, assetPresets);

  const medias = generateMedias(stage, loadedMedias, assets);

  const sources: Sources = {
    nodes: [...pages, ...posts, ...metas, ...medias, ...tags],
    pages,
    posts,
    metas,
    tags,
    medias
  };

  attachAssets(stage, assets, sources.nodes);

  sources.nodes.forEach(node => {
    metaType(node, 'article');
    metaAuthor(node, metaDefaults.author);
    metaDescription(node, metaDefaults.description);
    metaUrl(node, metaDefaults.baseUrl);
    metaKeywords(node);
    metaImage(node, assetLocator, metaDefaults.image);
  });

  if (process.env.DEBUG_NODES) {
    debug(sources.nodes);
  }

  return sources;
};
