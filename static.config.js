import path from 'path';

import getRoutes from './src/routes';

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
