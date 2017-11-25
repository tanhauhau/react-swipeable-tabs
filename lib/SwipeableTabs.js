'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var _TabIndicator = require('./TabIndicator');

var _TabIndicator2 = _interopRequireDefault(_TabIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwipeableTabs = function (_React$Component) {
  (0, _inherits3.default)(SwipeableTabs, _React$Component);
  (0, _createClass3.default)(SwipeableTabs, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props$springConfig = this.props.springConfig,
          duration = _props$springConfig.duration,
          easeFunction = _props$springConfig.easeFunction,
          delay = _props$springConfig.delay;

      return {
        snapTransition: 'all ' + duration + ' ' + easeFunction + ' ' + delay
      };
    }
  }]);

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
          tabIndicatorComponent = _props.tabIndicatorComponent,
          tabIndicatorStyle = _props.tabIndicatorStyle,
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
          tabIndicatorComponent: tabIndicatorComponent,
          tabIndicatorStyle: tabIndicatorStyle,
          mode: mode
        }),
        _react2.default.createElement(
          _reactSwipeableViews2.default,
          { index: index, onChangeIndex: onChangeIndex, onSwitching: this.onSwitching },
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

SwipeableTabs.defaultProps = {
  springConfig: {
    duration: '0.35s',
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    delay: '0s'
  },
  tabIndicatorComponent: _TabIndicator2.default
};
SwipeableTabs.childContextTypes = {
  snapTransition: _propTypes2.default.string
};
SwipeableTabs.propTypes = process.env.NODE_ENV !== "production" ? {
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.object),
  index: _propTypes2.default.number.isRequired,
  onChangeIndex: _propTypes2.default.func.isRequired,
  renderTab: _propTypes2.default.func.isRequired,
  renderTabContent: _propTypes2.default.func.isRequired,
  tabIndicatorComponent: _propTypes2.default.func,
  tabIndicatorStyle: _propTypes2.default.object,
  /**
   * This is the config used to create CSS transitions.
   * This is useful to change the dynamic of the transition.
   */
  springConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.string,
    easeFunction: _propTypes2.default.string,
    delay: _propTypes2.default.string
  })
} : {};
exports.default = SwipeableTabs;