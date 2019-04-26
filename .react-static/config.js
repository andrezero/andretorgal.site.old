import * as React from 'React';

const configure = options => {
  const { stage, getRoutes } = options;

  const config = {
    entry: 'index.tsx',
    getSiteData: () => ({}),
    getRoutes,
    plugins: [
      require.resolve('react-static-plugin-reach-router'),
      require.resolve('react-static-plugin-sitemap'),
      require.resolve('react-static-plugin-typescript')
    ],
    getSiteData: async () => ({
      title: 'André Torgal',
      lastBuilt: Date.now()
    }),
    Document: ({ Html, Head, Body, children, state: { siteData, renderMeta, routeInfo } }) => {
      const className = (routeInfo && routeInfo.data && routeInfo.data.className) || '';
      return (
        <Html lang="en-US">
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Body className={`root-${className}`}>{children}</Body>
        </Html>
      );
    }
  };

  if (stage === 'prod') {
    // config.siteRoot = 'http://andretorgal.com';
  }

  return config;
};

export default configure;
