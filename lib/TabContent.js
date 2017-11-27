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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WINDOW_HEIGHT = window.innerHeight;

var _ref2 = _react2.default.createElement('div', null);

var TabContent = function (_React$Component) {
  (0, _inherits3.default)(TabContent, _React$Component);

  function TabContent() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TabContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TabContent.__proto__ || (0, _getPrototypeOf2.default)(TabContent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { show: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TabContent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ show: this.props.shouldLoad });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.shouldLoad !== this.props.shouldLoad) {
        setTimeout(function () {
          _this2.setState({ show: nextProps.shouldLoad });
        }, 1000);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.isShown !== nextProps.isShown || this.state.show !== nextState.show;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.show) {
        return _ref2;
      }
      var style = this.props.isShown ? null : { maxHeight: WINDOW_HEIGHT, overflowY: 'hidden' };
      return _react2.default.createElement(
        'div',
        { style: style },
        this.props.renderTabContent()
      );
    }
  }]);
  return TabContent;
}(_react2.default.Component);

exports.default = TabContent;
TabContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Tell this tab content that current tab is being shown
   */
  isShown: _propTypes2.default.bool,
  /**
   * tab content, function to return react node
   */
  renderTabContent: _propTypes2.default.func,
  /**
   * Tell this tab to preload data
   */
  shouldLoad: _propTypes2.default.bool
} : {};