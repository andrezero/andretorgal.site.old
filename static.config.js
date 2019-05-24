import path from 'path';

import { configure } from './.react-static/config.js';
import { watch } from './.react-static/watch.js';

import { createRouteBuilder } from './src/routes';
import { createAssetPresets } from './src/Assets/assets.presets';
import { createAssetLocator } from './src/Assets/assets.locator';
import { loadSources } from './src/sources';
import { TemplateLocator } from './src/Shared/lib/classes/TemplateLocator';

const stage = process.env.BUILD_STAGE || 'dev';

const baseUrl = stage === 'dev' ? 'http://localhost:3000/' : 'https://andretorgal.com/';

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

const metaDefaults = {
  description:
    'My name is André Torgal and I was born in 1973 in Lisbon, Portugal. This is my website, a place where I can blog some thoughts and run a few experiments. Learn more about me, my work, and other stuff I have been up to.',
  author: 'André Torgal',
  image: 'https://pbs.twimg.com/profile_images/844137908252610566/OsT9RU83.jpg',
  assetsUrl: assetConfig.statics.url,
  baseUrl
};

const templateLocator = new TemplateLocator();
const sourceLoader = async () => loadSources(stage, assetLocator, assetPresets, metaDefaults);
const reactStaticConfig = configure({
  stage,
  getRoutes: createRouteBuilder(stage, sourceLoader, templateLocator)
});

if (stage === 'dev') {
  watch({ stage });
}

export default reactStaticConfig;
