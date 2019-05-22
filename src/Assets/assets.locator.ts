import { existsAsync, moveAsync } from 'fs-extra-promise';
import { dirname, join as pathJoin, parse as pathParse, resolve as pathResolve } from 'path';
import { format as formatUrl, parse as parseUrl } from 'url';

import { slug } from '../Shared/lib/strings';
import { Asset, AssetLocator, AssetSourceNode } from '../Shared/types/Asset.models';

const shardPrefix = (str: string, sharding: number): string => {
  const crypto = require('crypto');
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
    .substr(0, sharding);
};

const publicName = (filename: string, sharding: number, profile?: string, ext?: string): string => {
  const prefix = sharding ? shardPrefix(filename, sharding) : '';
  const parts = pathParse(filename);
  const sufix = profile ? `-${profile}` : '';
  const extension = ext ? `.${ext}` : parts.ext;
  const dirs = parts.dir
    .split('/')
    .filter(part => part !== '.')
    .map(slug)
    .join('/');
  return pathJoin(dirs, prefix, `${parts.name}${sufix}${extension}`);
};

const moveIfExists = async (asset: Asset, fromDir: string, toDir: string, sharding: number): Promise<string | void> => {
  const name = publicName(asset.url, sharding);
  const destination = pathResolve(pathJoin(toDir, name));
  const destinationExists = await existsAsync(destination);
  if (destinationExists) {
    return destination;
  }
  const source = pathResolve(fromDir, asset.url);
  const sourceExists = await existsAsync(source);
  if (sourceExists) {
    await moveAsync(source, destination, { overwrite: false });
    return destination;
  }
};

const isLocal = (url: string): boolean => {
  const isRelative = url.startsWith('./');
  const isIllegal = url.indexOf('..') > 0;
  return isRelative && !isIllegal;
};

const scanDir = async (asset: Asset, dir: string, staticsDir: string, sharding: number): Promise<boolean> => {
  const destination = await moveIfExists(asset, dir, staticsDir, sharding);
  if (typeof destination === 'string') {
    asset.filename = destination;
    return true;
  }
};

const scanDirs = async (asset: Asset, dirs: string[], staticsDir: string, sharding: number): Promise<boolean> => {
  let found;
  let ix = dirs.length;
  while (!found && ix--) {
    const directory = dirs[ix];
    found = await scanDir(asset, directory, staticsDir, sharding);
  }
  return found;
};

const scanSources = async (asset: Asset, staticsDir: string, sharding: number): Promise<boolean> => {
  const { sources } = asset;
  let found;
  let ix = sources.length;
  while (!found && ix--) {
    const source = sources[ix];
    if (source.type === 'node') {
      const node = (source as AssetSourceNode).node;
      if (node.source.type === 'file') {
        const directory = dirname(node.source.ref);
        found = await scanDir(asset, directory, staticsDir, sharding);
      }
    }
  }
  return found;
};

export interface LocatorConfig {
  scan: string[];
  statics: {
    shard: number;
    dir: string;
    url: string;
  };
}

export const createAssetLocator = (config: LocatorConfig): AssetLocator => {
  const sharding = config.statics.shard;
  const locate = async (asset: Asset) => {
    let found: boolean;
    found = await scanSources(asset, config.statics.dir, sharding);
    found = found || (await scanDirs(asset, config.scan, config.statics.dir, sharding));
    if (!found) {
      throw new Error(`Asset not found "${asset.url}", scanned "${config.scan.join(', ')}"`);
    }
  };

  const destination = (asset: Asset, profile: string, ext?: string) => {
    return pathJoin(config.statics.dir, publicName(asset.url, sharding, profile, ext));
  };

  const url = (asset: Asset, profile: string, ext?: string) => {
    const parts = parseUrl(config.statics.url);
    const pathname = publicName(asset.url, sharding, profile, ext);
    return formatUrl({ ...parts, pathname });
  };

  return { locate, url, destination };
};
