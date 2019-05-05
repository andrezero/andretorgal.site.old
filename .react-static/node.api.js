import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

import { extractCssChunks, cssLoader, postcssLoader, sassLoader, styleLoader } from '../.webpack/base.config';

export default () => ({
  webpack: (config, { stage }) => {
    const cssLoaders = [cssLoader, postcssLoader, sassLoader];

    if (stage === 'dev') {
      cssLoaders.unshift(styleLoader);
    } else if (stage === 'prod') {
      cssLoaders.unshift(extractCssChunks);
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
      use: cssLoaders
    });

    return config;
  }
});
