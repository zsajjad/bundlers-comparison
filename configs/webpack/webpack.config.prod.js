// Important modules this config uses
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: ['./src/index.js'],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 50000,
      minChunks: 3,
      maxAsyncRequests: 3,
      maxInitialRequests: 5,
      name: true,
      cacheGroups: {
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
          minSize: 50000,
          maxAsyncRequests: 3,
          maxInitialRequests: 5,
        },
      },
    },
    runtimeChunk: true,
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
