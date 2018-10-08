const webpack = require("webpack");
const path = require('path');

process.traceDeprecation = true

module.exports = {
  context: __dirname + '/app',
  // Where to start bundling
  entry: {
    app: './app.js',
  },

  // Where to output
  output: {
    // Output to the same directory
    path: path.resolve(__dirname, 'dist'), // string

    // Capture name from the entry using a pattern
    filename: '[name].js',
  },

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
              presets: ['@babel/preset-env', '@babel/preset-react'],
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

  // What extra processing to perform
  plugins: [

  ],

  // Adjust module resolution algorithm
  resolve: {

  },
};