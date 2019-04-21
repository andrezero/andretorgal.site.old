import path from 'path';
import chokidar from 'chokidar';
import { rebuildRoutes } from 'react-static/node';

import getRoutes from './src/routes';

const STAGE = process.env.BUILD_STAGE || 'dev';
if (STAGE === 'dev') {
  const watcher = chokidar.watch('content', {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    awaitWriteFinish: { stabilityThreshold: 100 }
  });
  watcher.on('all', rebuildRoutes);
}

export default {
  entry: 'index.tsx',
  siteRoot: 'http://andretorgal.com',
  getSiteData: () => ({}),
  getRoutes,
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    require.resolve('react-static-plugin-typescript')
  ]
};
