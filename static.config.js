import path from 'path';

import { configure } from './.react-static/config.js';
import { watch } from './.react-static/watch.js';

import { createRouteBuilder } from './src/routes';
import { createAssetPresets } from './src/Assets/assets.presets';
import { createAssetLocator } from './src/Assets/assets.locator';

const stage = process.env.BUILD_STAGE || 'dev';

const assetConfig = {
  scan: [path.resolve('../andretorgal.assets')],
  statics: {
    shard: 1,
    dir: path.resolve('../andretorgal.statics'),
    url: stage === 'dev' ? 'http://localhost:3333/' : 'https://statics.andretorgal.com/assets/'
  }
};
const assetLocator = createAssetLocator(assetConfig);
const assetPresets = createAssetPresets();

const reactStaticConfig = configure({
  stage,
  getRoutes: createRouteBuilder(assetLocator, assetPresets)
});

if (stage === 'dev') {
  watch({ stage });
}

export default reactStaticConfig;
