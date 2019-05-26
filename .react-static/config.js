import path from 'path';

import { htmlDocument } from '../src/Shared/HtmlDocument.component.tsx';

import { createRouteBuilder } from '../src/routes';
import { createAssetPresets } from '../src/Assets/assets.presets';
import { createAssetLocator } from '../src/Assets/assets.locator';
import { loadSources } from '../src/sources';
import { TemplateLocator } from '../src/Shared/lib/classes/TemplateLocator';

export const configure = options => {
  const { stage } = options;

  const baseUrl = {
    dev: 'http://localhost:3000/',
    stage: 'https://staging.andretorgal.com/',
    prod: 'https://andretorgal.com/'
  };

  const staticsUrl = {
    dev: 'http://localhost:3333/',
    stage: 'https://staging.statics.andretorgal.com/',
    prod: 'https://statics.andretorgal.com/'
  };

  const assetConfig = {
    scan: [path.resolve('../andretorgal.assets')],
    statics: {
      shard: 1,
      dir: path.resolve('./statics'),
      url: staticsUrl[stage]
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
    baseUrl: baseUrl[stage],
    canonicalUrl: baseUrl.prod
  };

  const templateLocator = new TemplateLocator();
  const sourceLoader = async () => loadSources(stage, assetLocator, assetPresets, metaDefaults);

  const robots = stage === 'prod' ? 'index,follow' : 'noindex';
  const metaTags = {
    robots: robots,
    'application-name': 'andretorgal.com',
    generator: 'react-static',
    copyright: 'Copyright 2019 André Torgal',
    'twitter:site': '@andrezero'
  };
  const siteData = {
    title: 'André Torgal',
    metaTags
  };

  const context = {
    stage,
    templateLocator,
    assetLocator,
    metaDefaults
  };

  const config = {
    entry: 'index.tsx',
    getSiteData: async () => siteData,
    getRoutes: createRouteBuilder(sourceLoader, context),
    Document: htmlDocument,
    plugins: [
      require.resolve('react-static-plugin-sitemap'),
      require.resolve('react-static-plugin-typescript'),
      require.resolve('react-static-plugin-react-router')
    ]
  };

  if (stage === 'prod') {
    // config.siteRoot = 'http://andretorgal.com';
  }

  return config;
};
