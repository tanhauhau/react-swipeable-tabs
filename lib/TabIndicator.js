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
      var _this2 = this;

      if (!this._tabGuidRef) {
        return;
      }
      // at the edge
      if (!from) {
        from = { left: -to.width, width: to.width };
      }
      if (!to) {
        to = { left: from.width * 2 + from.left, width: from.width };
      }
      requestAnimationFrame(function () {
        _this2._updateTransition(mode === 'move' ? 'all 0s ease 0s' : _this2.context.snapTransition);
        if (mode === 'move') {
          var translateX = (0, _utils.linearInterpolate)(from.left, to.left, t);
          var scaleX = (0, _utils.linearInterpolate)(from.width, to.width, t);
          _this2._transformIndicator(translateX, scaleX);
        } else {
          _this2._transformIndicator(to.left, to.width);
        }
      });
    }
  }, {
    key: '_updateTransition',
    value: function _updateTransition(transition) {
      domUtils.setTransition(this._tabGuidRef, transition);
    }
  }, {
    key: '_transformIndicator',
    value: function _transformIndicator(translateX, scaleX) {
      var transform = 'translate(' + translateX + 'px, 0) scale(' + scaleX + ',1)';
      domUtils.setTransform(this._tabGuidRef, transform);
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