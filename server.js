const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev.js');

const isDevelopment = (process.env.NODE_ENV !== 'production');
const port = isDevelopment ? 3000 : process.env.PORT;
const app = express();

if (isDevelopment) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      noInfo: true,
      modules: false
    }
  });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static('public'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

} else {
    app.use(express.static('public'));
    app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
    });
}
    app.listen(port || 8080, '0.0.0.0', function onStart(err) {
        if (err) { console.log(err); }
        console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser. Or port 8080 if running production locally', port, port);
    });


