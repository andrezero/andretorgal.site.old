import { existsAsync, moveAsync } from 'fs-extra-promise';
import { dirname, join as pathJoin, parse as pathParse, resolve as pathResolve } from 'path';
import { format as formatUrl, parse as parseUrl } from 'url';

import { slug } from '../Shared/lib/strings';
import { Asset, AssetLocator } from '../Shared/types/Asset.models';

const makePrefix = (str: string): string => {
  const crypto = require('crypto');
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
    .substr(0, 6);
};

const publicName = (filename: string, profile?: string, ext?: string): string => {
  const prefix = makePrefix(filename);
  const parts = pathParse(filename);
  const sufix = profile ? `-${profile}` : '';
  const extension = ext ? `.${ext}` : parts.ext;
  const dirs = parts.dir
    .split('/')
    .filter(part => part !== '.')
    .map(slug)
    .join('/');
  return pathJoin(prefix, dirs, `${parts.name}${sufix}${extension}`);
};

const moveIfExists = async (asset: Asset, fromDir: string, toDir: string): Promise<string | void> => {
  const name = publicName(asset.url);
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

const moveFromAssetsDir = async (asset: Asset, assetsDir: string, staticsDir: string): Promise<boolean> => {
  if (!isLocal(asset.url)) {
    return;
  }
  const destination = await moveIfExists(asset, assetsDir, staticsDir);
  if (typeof destination === 'string') {
    asset.filename = destination;
    return true;
  }
};

const moveFromSourceDir = async (asset: Asset, staticsDir: string): Promise<boolean> => {
  if (!isLocal(asset.url)) {
    return;
  }
  const sourceDir = dirname(asset.sources[0].filename);
  const destination = await moveIfExists(asset, sourceDir, staticsDir);
  if (typeof destination === 'string') {
    asset.filename = destination;
    return true;
  }
};

export interface LocatorConfig {
  scan: string[];
  statics: {
    dir: string;
    url: string;
  };
}

export const locatorBuilder = (config: LocatorConfig): AssetLocator => {
  const locate = async (asset: Asset) => {
    let found;
    found = await moveFromSourceDir(asset, config.statics.dir);
    let ix = config.scan.length;
    while (!found && ix--) {
      found = await moveFromAssetsDir(asset, config.scan[ix], config.statics.dir);
    }
    if (!found) {
      const scanned = [dirname(asset.sources[0].filename), ...config.scan];
      throw new Error(`Asset not found "${asset.url}", scanned "${scanned.join(', ')}"`);
    }
  };

  const destination = (asset: Asset, profile: string, ext?: string) => {
    return pathJoin(config.statics.dir, publicName(asset.url, profile, ext));
  };

  const url = (asset: Asset, profile: string, ext?: string) => {
    const parts = parseUrl(config.statics.url);
    const pathname = publicName(asset.url, profile, ext);
    return formatUrl({ ...parts, pathname });
  };

  return { locate, url, destination };
};
