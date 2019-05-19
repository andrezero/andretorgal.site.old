import sharp = require('sharp');

import { pipelineFor } from '../lib/pipelines';

import { ImageAssetSrc } from '../../Media/types/Media.models';
import { Asset, AssetPipelines, AssetProcessor } from '../../Shared/types/Asset.models';

interface ImageBase64Options {
  width: number;
  height: number;
}

export const imageBase64 = (options: ImageBase64Options): AssetProcessor => {
  return async (asset: Asset, pipelines: AssetPipelines) => {
    const pipeline = (await pipelineFor(pipelines, 'sharp', asset)) as sharp.Sharp;

    pipeline.resize(options.width, options.height);

    try {
      const { data: buffer, info } = await pipeline.toBuffer({
        resolveWithObject: true
      });
      const src: ImageAssetSrc = {
        href: `data:image/${info.format};base64,${buffer.toString(`base64`)}`,
        width: info.width,
        height: info.height,
        ratio: info.width / info.height
      };
      return src;
    } catch (err) {
      throw new Error(`Failed to process imageBase64(${JSON.stringify(options)}) for ${asset.url} with ${err.stack}`);
    }
  };
};
