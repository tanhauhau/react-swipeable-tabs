'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _domUtils = require('../dom-utils');

var domUtils = _interopRequireWildcard(_domUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabStyle = {
  display: 'inline-flex',
  alignItems: 'center'
};

var Tab = function (_React$Component) {
  (0, _inherits3.default)(Tab, _React$Component);

  function Tab(props) {
    (0, _classCallCheck3.default)(this, Tab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, props));

    _this.setRef = _this.setRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Tab, [{
    key: 'syncScroll',
    value: function syncScroll(t, mode) {
      if (!this._ref || typeof this.sync !== 'function') {
        return;
      }
      this._updateTransition(mode === 'move' ? 'all 0s ease 0s' : this.context.snapTransition);
      this.sync(this._ref, t, mode);
    }
  }, {
    key: 'setRef',
    value: function setRef(ref) {
      this._ref = ref;
    }
  }, {
    key: '_updateTransition',
    value: function _updateTransition(transition) {
      domUtils.setTransition(this._ref, transition);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          background = _props.background,
          data = _props.data;

      var style = (0, _extends3.default)({}, tabStyle, { height: height, background: background });
      return _react2.default.createElement(
        'div',
        { ref: this.setRef, style: style },
        this.renderTab(data)
      );
    }

    /* template method */

  }, {
    key: 'sync',
    value: function sync(ref, t, mode) {}
  }, {
    key: 'renderTab',
    value: function renderTab(data) {
      return _react2.default.createElement(
        'span',
        null,
        (0, _stringify2.default)(data)
      );
    }
  }]);
  return Tab;
}(_react2.default.Component);

Tab.contextTypes = {
  snapTransition: _propTypes2.default.string
};
Tab.REF_NAME = '_ref';
exports.default = Tab;
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  background: _propTypes2.default.string,
  height: _propTypes2.default.number,
  onClick: _propTypes2.default.func
} : {};