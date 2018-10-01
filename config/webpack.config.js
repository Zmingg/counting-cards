const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
  context: path.resolve(__dirname, '.'),

  entry: '../src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/store')
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
      template: '../index.html',
      filename: 'index.html'
    })
  ],

};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {

    webpackConfig.devtool = 'source-map';

    webpackConfig.devServer = {
      contentBase: __dirname,
      host: '0.0.0.0',
      port: '8099',
      historyApiFallback: true,
      publicPath: '/',
      disableHostCheck: true
    };
  }

  if (argv.mode === 'production') {

    webpackConfig.output.chunkFilename = '[chunkhash].js';

    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[chunkhash].css',
      }),
    );

    webpackConfig.optimization = {
      splitChunks: {
        chunks: 'initial',
        minSize: 0,
        cacheGroups: {
          default: {
            priority: -30,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: -20,
          }
        }
      }
    };

  }

  return webpackConfig;

};
