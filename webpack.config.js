// node
const path = require('path');

// npm
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const package = require('./package.json');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(package.version),
      __NAME__: JSON.stringify(package.displayName),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Pixiplate',
      template: './src/template.ejs',
    }),
    new HtmlWebpackTagsPlugin({ tags: ['./style.css'], append: true }),
    new CopyPlugin({
      patterns: [
        {
          from: './assets',
          to: './assets',
        },
        {
          from: './src/style.css',
          to: './style.css',
        },
      ],
    }),
    new webpack.ProgressPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.frag$/i,
        use: 'raw-loader',
      },
      {
        test: /\.vert$/i,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        // Now we apply rule for static files
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf|mp3|ogg|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'public',
        },
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@svg': path.resolve(__dirname, 'src/shared/svg'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@src': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, './assets'),
    },
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },
  devServer: {
    open: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
