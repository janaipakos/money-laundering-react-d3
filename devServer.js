var path = require('path');
var express = require('express');
var webpack = require('webpack');
var static_path = path.join(__dirname, 'dist');
var isDevelopment = (process.env.NODE_ENV !== 'production');
var port = isDevelopment ? 3000 : process.env.PORT;
var app = express();


if (isDevelopment) {
  var compiler = webpack(config);
  var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');



app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

  app.use(webpackHotMiddleware(compiler));

  app.use(express.static('public'));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  app.use(express.static(static_path));

  app.get('*', function response(req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
});


app.listen(process.env.PORT || 8080, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
}
