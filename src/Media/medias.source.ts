import { parseFileContents } from '../Shared/lib/content';
import { collect, flatten } from '../Shared/lib/files';
import { newNode, newNodeFromFile } from '../Shared/lib/nodes';
import { FileSysNode } from '../Shared/lib/types/File.types';
import { Asset } from '../Shared/types/Asset.models';

import { slug } from '../Shared/lib/strings';
import { MediaNode } from './types/Media.models';

const nodeDefaults = {
  template: 'Taxonomy/Tag',
  prefix: 'tags'
};

const newMediaFromFile = (file: FileSysNode): MediaNode => {
  const fileContents = parseFileContents(file);
  const defaults = { ...nodeDefaults, path: '{name}', title: '{name}' };
  const { node } = newNodeFromFile('media', fileContents, defaults);

  const media = node as MediaNode;

  return media;
};

export const loadMedias = async (): Promise<MediaNode[]> => {
  const tree = await collect('./content/media', true);
  const flattened = flatten(tree.children);
  return flattened.map(newMediaFromFile);
};

const newMediaFromAsset = (asset: Asset): MediaNode => {
  const defaults = {
    template: 'Media/Page',
    prefix: 'media'
  };
  const mediaNode = newNode('asset', asset.title || slug(asset.url), defaults) as MediaNode;
  mediaNode.abstract = asset.alt;
  mediaNode.meta.asset = asset;
  mediaNode.meta.assets.push(asset);

  return mediaNode;
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

export const generateMedias = (mediaNodes: MediaNode[], assets: Asset[]): MediaNode[] => {
  const mediaIndex = indexMediaNodes(mediaNodes);
  const ret = [...mediaNodes];
  assets.forEach(asset => {
    indexAsset(mediaIndex, asset, ret);
  });

  return assets.map(newMediaFromAsset);
};
