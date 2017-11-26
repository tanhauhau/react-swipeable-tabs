'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseTab = require('./BaseTab');

var _BaseTab2 = _interopRequireDefault(_BaseTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(toString) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var sync = _ref.sync,
      props = (0, _objectWithoutProperties3.default)(_ref, ['sync']);

  return function (_Tab) {
    (0, _inherits3.default)(TextTab, _Tab);

    function TextTab() {
      var _ref2;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, TextTab);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = TextTab.__proto__ || (0, _getPrototypeOf2.default)(TextTab)).call.apply(_ref2, [this].concat(args))), _this), _this.sync = sync, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TextTab, [{
      key: 'renderTab',
      value: function renderTab(data) {
        return _react2.default.createElement(
          'div',
          props,
          toString(data)
        );
      }
    }]);
    return TextTab;
  }(_BaseTab2.default);
};

exports.default = create;