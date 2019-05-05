import { htmlDocument } from '../src/Shared/HtmlDocument.component.tsx';

export const configure = options => {
  const { stage, getRoutes } = options;

  const config = {
    entry: 'index.tsx',
    getRoutes,
    plugins: [
      require.resolve('react-static-plugin-sitemap'),
      require.resolve('react-static-plugin-typescript'),
      require.resolve('react-static-plugin-react-router')
    ],
    getSiteData: async () => ({
      title: 'André Torgal',
      lastBuilt: Date.now()
    }),
    Document: htmlDocument
  };

  if (stage === 'prod') {
    // config.siteRoot = 'http://andretorgal.com';
  }

  return config;
};
