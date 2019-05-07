const path = require('path');
const pkg = require('../package.json');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
  context: path.resolve(__dirname, '.'),

  entry: '../src/index.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '/',
    library: pkg.name,
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          context: __dirname,
          configFile: __dirname + '/tsconfig.json'
        }
      },
      {
        test: [/\.json$/i],
        use: [
          {
            loader: 'json-loader',
            options: {
              outputPath: './static/data/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: '../samples/index.html',
      filename: 'index.html'
    })
  ],

};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {

    webpackConfig.entry = '../samples/index.js',

    webpackConfig.devtool = 'source-map';

    webpackConfig.devServer = {
      contentBase: __dirname,
      host: '0.0.0.0',
      port: '8180',
      historyApiFallback: true,
      publicPath: '/',
      disableHostCheck: true
    };
  }

  if (argv.mode === 'production') {

    webpackConfig.externals = ['react', 'react-dom', 'lodash', 'prop-types', 'debug'];

    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[chunkhash].css',
      }),
    );

  }

  return webpackConfig;

};
