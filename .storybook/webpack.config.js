const loaders = require('../.webpack/base.config');

const { styleLoader, cssLoader, cssModulesLoader, postcssLoader, sassLoader } = loaders;

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.module\.scss$/,
      use: [styleLoader, cssModulesLoader, postcssLoader, sassLoader]
    },
    {
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: [styleLoader, cssLoader, postcssLoader, sassLoader]
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader')
        },
        {
          loader: require.resolve('react-docgen-typescript-loader')
        }
      ]
    }
  );

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
