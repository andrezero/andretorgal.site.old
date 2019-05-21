import sharp = require('sharp');

import { pipelineFor } from '../pipelines';

import { ImageAssetSrc } from '../../../../Media/types/Media.models';
import { Asset, AssetLocator, AssetPipelines, AssetProcessor, AssetSrc } from '../../../types/Asset.models';

interface ImageResizeOptions {
  width: number;
  height?: number;
}

export const imageResize = (options: ImageResizeOptions): AssetProcessor => {
  return async (asset: Asset, pipelines: AssetPipelines, profile: string, locator: AssetLocator): Promise<AssetSrc> => {
    const pipeline = (await pipelineFor(pipelines, 'sharp', asset)) as sharp.Sharp;

    pipeline.resize(options.width);

    const destination = locator.destination(asset, profile);
    const href = locator.url(asset, profile);

    try {
      const info = await pipeline.toFile(destination);
      const src: ImageAssetSrc = {
        href,
        width: info.width,
        height: info.height,
        ratio: info.width / info.height
      };
      return src;
    } catch (err) {
      throw new Error(`Failed to process imageResize(${JSON.stringify(options)}) for ${asset.url} with ${err.stack}`);
    }
  };
};
