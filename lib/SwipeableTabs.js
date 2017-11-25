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

var _reactSwipeableViews = require('./react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _TabHeader = require('./TabHeader');

var _TabHeader2 = _interopRequireDefault(_TabHeader);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwipeableTabs = function (_React$Component) {
  (0, _inherits3.default)(SwipeableTabs, _React$Component);

  function SwipeableTabs(props) {
    (0, _classCallCheck3.default)(this, SwipeableTabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SwipeableTabs.__proto__ || (0, _getPrototypeOf2.default)(SwipeableTabs)).call(this, props));

    _this._tabHeader = null;

    _this.onSwitching = _this.onSwitching.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SwipeableTabs, [{
    key: 'onSwitching',
    value: function onSwitching(index, mode) {
      if (this._tabHeader) {
        this._tabHeader.syncGuide(index, mode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          mode = _props.mode,
          index = _props.index,
          onChangeIndex = _props.onChangeIndex,
          tabs = _props.tabs,
          tabGuideStyle = _props.tabGuideStyle,
          tabGuideInterpolation = _props.tabGuideInterpolation,
          renderTab = _props.renderTab,
          _renderTabContent = _props.renderTabContent;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TabHeader2.default, {
          ref: function ref(_ref) {
            return _this2._tabHeader = _ref;
          },
          index: index,
          onChangeIndex: onChangeIndex,
          renderTab: renderTab,
          tabs: tabs,
          tabGuideStyle: tabGuideStyle,
          tabGuideInterpolation: tabGuideInterpolation,
          mode: mode
        }),
        _react2.default.createElement(
          _reactSwipeableViews2.default,
          {
            index: index, onChangeIndex: onChangeIndex,
            onSwitching: this.onSwitching },
          tabs.map(function (tab, idx) {
            return _react2.default.createElement(_TabContent2.default, {
              key: idx,
              show: idx >= index - 1 && idx <= index + 1,
              renderTabContent: function renderTabContent() {
                return _renderTabContent(tab, idx);
              }
            });
          })
        )
      );
    }
  }]);
  return SwipeableTabs;
}(_react2.default.Component);

exports.default = SwipeableTabs;
SwipeableTabs.propTypes = process.env.NODE_ENV !== "production" ? {
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.object),
  index: _propTypes2.default.number.isRequired,
  onChangeIndex: _propTypes2.default.func.isRequired,
  renderTab: _propTypes2.default.func.isRequired,
  renderTabContent: _propTypes2.default.func.isRequired,
  tabGuideStyle: _propTypes2.default.object
} : {};