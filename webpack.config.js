const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode,
  devtool: mode === 'development' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    alias: {
      GameSystem: path.resolve(__dirname, 'GameSystem'),
      assets: path.resolve(__dirname, 'assets'),
      src: path.resolve(__dirname, 'src'),
      'src/actors': path.resolve(__dirname, 'src', 'actors'),
    },
    extensions: ['.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 9090,
    hot: true,
    open: true,
    contentBase: path.join(__dirname, 'assets'),
    contentBasePublicPath: '/assets',
  },
  experiments: {
    topLevelAwait: true,
  },
};
