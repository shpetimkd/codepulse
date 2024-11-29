/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: slsw.lib.webpack.isLocal ? 'source-map' : 'cheap-source-map',
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    extensions: ['.cjs', '.mjs', '.js', '.ts'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  // Where the bundled files will be output.
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  externals: ['aws-sdk', nodeExternals(), 'dd-trace'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          [path.resolve(__dirname, '.webpack'), path.resolve(__dirname, '.serverless')],
        ],
        options: {
          transpileOnly: true,
          // Enable file caching, can be quite useful when running offline
          experimentalFileCaching: true,
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
