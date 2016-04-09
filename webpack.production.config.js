var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: {
    path: path.join(path.resolve(path.dirname()), config.publicFolder),
        publicPath: '/' + config.publicFolder + '/',
        filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|\.jsx$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: path.join(__dirname, 'css')
      }]
  }
};
