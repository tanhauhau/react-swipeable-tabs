'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _domUtils = require('./dom-utils');

var domUtils = _interopRequireWildcard(_domUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabIndicatorStyle = {
  width: 1,
  height: 4,
  position: 'absolute',
  left: 0,
  bottom: 0,
  transformOrigin: 0
};

var TabIndicator = function (_React$Component) {
  (0, _inherits3.default)(TabIndicator, _React$Component);

  function TabIndicator() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TabIndicator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TabIndicator.__proto__ || (0, _getPrototypeOf2.default)(TabIndicator)).call.apply(_ref, [this].concat(args))), _this), _this._tabGuidRef = null, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TabIndicator, [{
    key: 'syncScroll',
    value: function syncScroll(from, to, t, mode) {
      if (!this._tabGuidRef) {
        return;
      }
      if (mode === 'move') {
        var translateX = (0, _utils.linearInterpolate)(from.left, to.left, t);
        var scaleX = (0, _utils.linearInterpolate)(from.width, to.width, t);
        this._transformIndicator('all 0s ease 0s', translateX, scaleX);
      } else {
        this._transformIndicator(this.context.snapTransition, to.left, to.width);
      }
    }
  }, {
    key: '_transformIndicator',
    value: function _transformIndicator(transition, translateX, scaleX) {
      var _this2 = this;

      var transform = 'translate(' + translateX + 'px, 0) scale(' + scaleX + ',1)';
      requestAnimationFrame(function () {
        domUtils.setTransition(_this2._tabGuidRef, transition);
        domUtils.setTransform(_this2._tabGuidRef, transform);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          tabIndicatorStyleProp = _props.tabIndicatorStyle,
          onTabIndicatorTransitionEnd = _props.onTabIndicatorTransitionEnd;

      var style = (0, _extends3.default)({}, tabIndicatorStyle, tabIndicatorStyleProp);
      return _react2.default.createElement('i', {
        style: style,
        ref: function ref(_ref2) {
          return _this3._tabGuidRef = _ref2;
        },
        onTransitionEnd: onTabIndicatorTransitionEnd
      });
    }
  }]);
  return TabIndicator;
}(_react2.default.Component);

TabIndicator.contextTypes = {
  snapTransition: _propTypes2.default.string
};
exports.default = TabIndicator;