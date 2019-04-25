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

const cssModulesLoader = {
  loader: 'typings-for-css-modules-loader',
  options: {
    importLoaders: 2,
    modules: true,
    namedExport: true,
    camelCase: true,
    localIdentName: '[name]__[local]--[hash:base64:5]',
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
  styleLoader,
  cssLoader,
  cssModulesLoader,
  postcssLoader,
  sassLoader
};
