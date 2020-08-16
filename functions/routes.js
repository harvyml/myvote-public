'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexRoute = _express2.default.Router();

indexRoute.get('/tree:/code', function (req, res, next) {
	res.send('<h1>' + indexRoute.param.code + '</h1>');
	next();
});

exports.default = indexRoute;