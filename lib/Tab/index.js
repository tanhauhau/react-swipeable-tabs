'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CustomTab = require('./CustomTab');

var _CustomTab2 = _interopRequireDefault(_CustomTab);

var _TextTab = require('./TextTab');

var _TextTab2 = _interopRequireDefault(_TextTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  text: _TextTab2.default,
  custom: _CustomTab2.default
};