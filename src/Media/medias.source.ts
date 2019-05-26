import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { resolveNodeMeta } from '../Shared/lib/meta';
import { filterHasNotTag, newNode, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';
import { Asset, AssetLocator } from '../Shared/types/Asset.models';
import { NodeMetaDefaults } from '../Shared/types/Node.models';

import { slug } from '../Shared/lib/strings';
import { RouteContext } from '../Shared/types/Route.models';
import { MediaNode } from './types/Media.models';

const nodeDefaults = {
  template: 'Taxonomy/Tag',
  prefix: 'tags'
};

const newMediaFromFile = (stage: string, file: FileSysNode): MediaNode => {
  const fileContents = parseFileContents(stage, file);
  const defaults = { ...nodeDefaults, path: '{name}', title: '{name}' };
  const { node } = newNodeFromFile('media', fileContents, defaults);

  const media = node as MediaNode;

  return media;
};

const newMediaFromAsset = (asset: Asset): MediaNode => {
  const defaults = {
    template: 'Media/Page',
    prefix: 'media'
  };
  const media = newNode('media', asset.title || slug(asset.url), defaults) as MediaNode;
  media.abstract = asset.alt;
  media.meta.asset = asset;
  media.meta.assets.push(asset);

  return media;
};

interface MediaIndex {
  [name: string]: MediaNode;
}

const indexNewMedia = (mediaIndex: MediaIndex, asset: Asset): MediaNode => {
  const mediaNode = newMediaFromAsset(asset);
  mediaIndex[asset.url] = mediaNode;
  return mediaNode;
};

const indexExistingMedia = (mediaIndex: MediaIndex, asset: Asset) => {
  mediaIndex[asset.url].meta.asset = asset;
  mediaIndex[asset.url].meta.assets.push(asset);
};

const indexAsset = (mediaIndex: MediaIndex, asset: Asset, nodes: MediaNode[]) => {
  if (!mediaIndex[asset.url]) {
    const mediaNode = indexNewMedia(mediaIndex, asset);
    nodes.push(mediaNode);
  } else {
    indexExistingMedia(mediaIndex, asset);
  }
};

const indexMediaNodes = (medias: MediaNode[]): MediaIndex => {
  const index: MediaIndex = {};
  medias.forEach(media => {
    index[media.url] = media;
  });
  return index;
};

export const loadMedias = async (stage: string): Promise<MediaNode[]> => {
  const tree = await collect('./content/media', true);
  const flattened = flatten(tree.children);
  const nodes = flattened.map(file => newMediaFromFile(stage, file));
  const filtered = stage === 'prod' ? nodes.filter(filterHasNotTag('draft')) : nodes;
  return filtered;
};

export const generateMedias = (mediaNodes: MediaNode[], assets: Asset[]): MediaNode[] => {
  const mediaIndex = indexMediaNodes(mediaNodes);
  const ret = [...mediaNodes];
  assets.forEach(asset => {
    indexAsset(mediaIndex, asset, ret);
  });

  return assets.map(newMediaFromAsset);
};
