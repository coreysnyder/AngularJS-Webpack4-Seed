const webpack = require("webpack");
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

process.traceDeprecation = true;
var ENV = process.env.npm_lifecycle_event;
var isTest = (ENV.indexOf('test') > -1); // lifecycle event contains 'test'
var publicPath = '/contract-performance/';

module.exports = {
  context: __dirname + '/app',
  // Where to start bundling
  entry: {
    app: './app.js',
  },

  mode: isTest ? 'development' : 'production',
  // Where to output
  output: isTest ? {} : {
    path: path.resolve(__dirname, 'dist'), // string
    publicPath: publicPath, // Necessary - If set to '/' the browser will try to load app.js out of localhost/
    // Capture name from the entry using a pattern
    filename: '[name].js',
  },

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    // hot: false,
    historyApiFallback: true,
    publicPath: publicPath, // It is recommended that devServer.publicPath is the same as output.publicPath.
  },


   // What extra processing to perform
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test App',
      template: "index.ejs",
      // hash: true, // Applies a ?2f2343 hash at the end of the file name to bust the cache
      publicPath: publicPath // Used to set the <base> tag in the HTML
    })
  ],


  // How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // Don't attempt to transpile any non-@aver node-modules
        exclude: /(node_modules\/(?!(@aver)\/).*|bower_components)/,
        use: [
          {
            loader: 'ng-annotate-loader',
            options: { add: true, single_quotes: true }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              retainLines: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [ 'ngtemplate-loader', 'html-loader' ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]'}
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 100000 }
          }
        ]
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 100000 }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype:'application/font-woff' }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/octet-stream' }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'image/svg+xml' }
          }
        ]
      }
    ],
  },


  // Adjust module resolution algorithm
  resolve: {

  },
};