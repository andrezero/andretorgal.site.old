import fs from 'fs';
import sharp from 'sharp';

import { Asset, AssetPipelines } from '../../types/Asset.models';

const assertFile = (asset: Asset) => {
  if (!fs.existsSync(asset.filename)) {
    throw new Error(`Asset file not found ${asset.url} > ${asset.filename}`);
  }
};

const createPipeline = async (name: string, asset: Asset): Promise<any> => {
  switch (name) {
    case 'sharp':
      assertFile(asset);
      return sharp(asset.filename).rotate();
  }
  throw new Error(`Unknown pipeline ${name} for ${asset.filename} (${asset.originalUrl})`);
};

export const pipelineFor = async (pipelines: AssetPipelines, name: string, asset: Asset): Promise<any> => {
  if (pipelines[name]) {
    return pipelines[name];
  }
  pipelines[name] = await createPipeline(name, asset);
  return pipelines[name];
};
