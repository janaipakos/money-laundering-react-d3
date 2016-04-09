const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const configure = require('./webpack.config.dev.js');
const config = require('./config.json');
const app = express();

const isDevelopment = (process.env.NODE_ENV !== 'production');
const port = isDevelopment ? 3000 : process.env.PORT;
const static_path = path.join(path.resolve(path.dirname()), config.publicFolder);


var prodListener = app.use(express.static(static_path))
    .get('/', function (req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    }).listen(process.env.PORT || config.prodPort, function (err) {
        if (err) { console.log(err); }
        console.log('Production is listening at localhost:' + prodListener.address().port);
    });

if (isDevelopment) {
    var webpackDevConf = require('./webpack.config.dev');
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(webpackDevConf), {
        publicPath: webpackDevConf.output.publicPath,
        hot: true,
       stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      noInfo: true,
      modules: false
    }
    }).listen(config.devPort, 'localhost', function (err) {
        if (err) { console.log(err); }
        console.log('Development is listening at localhost:' + config.devPort);
    });
}

