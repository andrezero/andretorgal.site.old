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
    ]
  };

  if (stage === 'prod') {
    // config.siteRoot = 'http://andretorgal.com';
  }

  return config;
};

export default configure;
