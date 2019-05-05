import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

const extractCssChunks = {
  loader: ExtractCssChunks.loader,
  options: {
    modules: true
  }
};

const styleLoader = {
  loader: 'style-loader',
  options: { sourceMap: true }
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: false,
    sourceMap: true
  }
};

const postcssLoader = {
  loader: 'postcss-loader'
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassIncludePaths: ['src/'],
    sourceMap: false
  }
};

module.exports = {
  extractCssChunks,
  styleLoader,
  cssLoader,
  postcssLoader,
  sassLoader
};
