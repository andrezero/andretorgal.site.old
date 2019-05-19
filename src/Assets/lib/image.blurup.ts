import sharp = require('sharp');

import { Asset, AssetLocator, AssetPipelines, AssetProcessor } from '../../Shared/types/Asset.models';
import { pipelineFor } from './pipelines';

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
      const src = {
        href: `data:image/${info.format};base64,${buffer.toString(`base64`)}`,
        width: info.width,
        height: info.height,
        aspectRatio: info.width / info.height
      };
      return src;
    } catch (err) {
      throw new Error(`Failed to process imageBase64(${JSON.stringify(options)}) for ${asset.url} with ${err.stack}`);
    }
  };
};
