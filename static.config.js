import path from 'path';

import { configure } from './.react-static/config.js';
import { watch } from './.react-static/watch.js';

import { routeBuilder } from './src/routes';
import { presetBuilder } from './src/Assets/assets.presets';
import { locatorBuilder } from './src/Assets/assets.locator';

const stage = process.env.BUILD_STAGE || 'dev';

const locatorConfig = {
  scan: [path.resolve('../andretorgal.assets')],
  statics: {
    dir: path.resolve('../andretorgal.statics'),
    url: stage === 'dev' ? 'http://localhost:3333/' : 'https://statics.andretorgal.com/assets/'
  }
};
const assetLocator = locatorBuilder(locatorConfig);
const assetPresets = presetBuilder();

const reactStaticConfig = configure({
  stage,
  getRoutes: routeBuilder(assetLocator, assetPresets).getRoutes
});

if (stage === 'dev') {
  watch({ stage });
}

export default reactStaticConfig;
