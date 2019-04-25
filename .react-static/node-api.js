import webpack from 'webpack';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

// props: @asmallstudio/plugin-react-static-css-modules-postcss-sass

export default () => ({
  webpack: (config, { defaultLoaders, stage }) => {
    config.plugins.push(new webpack.WatchIgnorePlugin([/css\.d\.ts$/]));

    let loaders = [];

    const styleLoader = {
      loader: 'style-loader',
      options: { sourceMap: true }
    };
    const cssLoaderOptions = {
      importLoaders: 2,
      modules: true,
      namedExport: true,
      camelCase: true,
      localIdentName: stage === 'dev' ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
      sourceMap: true
    };
    const cssLoader = {
      loader: 'typings-for-css-modules-loader',
      options: cssLoaderOptions
    };
    const postcssLoader = {
      loader: 'postcss-loader'
    };
    const sassLoader = {
      loader: 'sass-loader',
      options: {
        sassIncludePaths: ['srcx/'],
        sourceMap: false
      }
    };

    if (stage === 'dev') {
      // Dev
      loaders = [styleLoader, cssLoader, postcssLoader, sassLoader];
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      // Actually: Always extract css to file during node build process (see backlog.md for issues)
      loaders = [
        // see issues
        {
          loader: ExtractCssChunks.loader,
          options: {
            modules: true
          }
        },
        // {
        //   ...cssLoader,
        //   options: {
        //     ...cssLoaderOptions,
        //     exportOnlyLocals: true
        //   }
        // },
        cssLoader,
        postcssLoader,
        sassLoader
      ];
    } else {
      // Prod
      loaders = [
        {
          loader: ExtractCssChunks.loader,
          options: {
            modules: true
          }
        },
        cssLoader,
        postcssLoader,
        sassLoader
      ];
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.s(a|c)ss$/,
      use: loaders
    });

    config.plugins.push(
      new ExtractCssChunks({
        filename: '[name].[chunkHash:8].css',
        chunkFilename: '[id].[chunkHash:8].css'
      })
    );

    return config;
  }
});
