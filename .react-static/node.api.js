import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import webpack from 'webpack';

const extractCssChunks = {
  loader: ExtractCssChunks.loader,
  options: {
    modules: true
  }
};

import { cssLoader, cssModulesLoader, postcssLoader, sassLoader, styleLoader } from '../.webpack/base.config';

// props: @asmallstudio/plugin-react-static-css-modules-postcss-sass

export default () => ({
  webpack: (config, { stage }) => {
    config.plugins.push(new webpack.WatchIgnorePlugin([/css\.d\.ts$/]));

    const modulesLoader = { ...cssModulesLoader };
    if (stage !== 'dev') {
      const options = cssModulesLoader.options;
      modulesLoader.options = {
        ...options,
        localIdentName: '[hash:base64:5]'
      };
    }

    const cssLoaders = {
      global: [cssLoader, postcssLoader, sassLoader],
      modules: [modulesLoader, postcssLoader, sassLoader]
    };

    if (stage === 'dev') {
      cssLoaders.global.unshift(styleLoader);
      cssLoaders.modules.unshift(styleLoader);
    } else {
      // stage = node|prod
      // Note: shouldn't extract css to file during node build process (stage === 'node')
      // but set to always extract (see backlog.md for issues)
      cssLoaders.global.unshift(extractCssChunks);
      cssLoaders.modules.unshift(extractCssChunks);
      config.plugins.push(
        new ExtractCssChunks({
          filename: '[name].[chunkHash:8].css',
          chunkFilename: '[id].[chunkHash:8].css'
        })
      );
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: cssLoaders.global
    });

    config.module.rules[0].oneOf.unshift({
      test: /\.module\.scss$/,
      use: cssLoaders.modules
    });

    return config;
  }
});
