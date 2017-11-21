'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _initController = require('./controller/initController.js');

var _initController2 = _interopRequireDefault(_initController);

var _config = require('./config/config.js');

var _config2 = _interopRequireDefault(_config);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convert = require('koa-convert');
var path = require('path');
var serve = require('koa-static');

var app = new _koa2.default();

_initController2.default.init(app, _koaSimpleRouter2.default);
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.get("viewDir"),
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false
}));
app.use(serve(_config2.default.get('staticDir')));
app.listen(_config2.default.get('port'));
