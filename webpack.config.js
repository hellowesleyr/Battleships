const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundeAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
    entry: {
        index: './src/index.js',
      },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname,'dist'),
    } ,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
        {
            test: /\.css$/i,

            use: ['style-loader', 'css-loader'],
        },
        {

            test: /\.(png|svg|jpg|jpeg|gif)$/i,
    
            type: 'asset/resource',
    
          },
          {
            test: /\.js$/,
            exclude: {
              and: [/node_modules/], // Exclude libraries in node_modules ...
              not: [
                // Except for a few of them that needs to be transpiled because they use modern syntax
                /unfetch/,
                /d3-array|d3-scale/,
                /@hapi[\\/]joi-date/,
              ]
            },
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            }
          }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ]
};