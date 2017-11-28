'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _TabHeader = require('./TabHeader');

var _TabHeader2 = _interopRequireDefault(_TabHeader);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _TabIndicator = require('./TabIndicator');

var _TabIndicator2 = _interopRequireDefault(_TabIndicator);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _domUtils = require('./dom-utils');

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
    _this._tabs = [];
    _this._offPassiveScroll = null;
    _this._scrollPosition = [];

    _this.onSwitching = _this.onSwitching.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SwipeableTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window._scrollPosition = this._scrollPosition;
      this._offPassiveScroll = (0, _domUtils.onPassiveScroll)(window, this.handleScroll);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof this._offPassiveScroll === 'function') {
        this._offPassiveScroll();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.index !== this.props.index) {
        this.resetScroll(nextProps.index);
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      this.isAligned = false;
      return;

      // don't do translate Y on scroll
      if (this.ignoreScroll) {
        this.ignoreScroll = false;
        return;
      }
      var scrollTop = window.scrollY;
      for (var i = 0; i < this.props.tabs.length; i++) {
        if (i !== this.props.index) {
          this._tabs[i].translateY(scrollTop - (this._scrollPosition[i] || 0));
        } else {
          this._scrollPosition[i] = scrollTop;
          this._tabs[i].updateMaxHeight(scrollTop);
        }
      }
    }
  }, {
    key: 'resetScroll',
    value: function resetScroll(index) {
      var _this2 = this;

      this._scrollPosition[this.props.index] = window.scrollY;
      requestAnimationFrame(function () {
        // this._tabs[index].translateY(0);
        for (var i = 0; i < _this2.props.tabs.length; i++) {
          if (i !== index) {
            _this2._tabs[i].translateY(-(_this2._scrollPosition[i] || 0) + (_this2._scrollPosition[index] || 0));
          } else {
            _this2._tabs[i].translateY(0);
          }
        }
        // TODO how do you make sure you always able to scroll to that position
        window.scrollTo(window.scrollX, _this2._scrollPosition[index] || 0);
      });
    }
  }, {
    key: 'onSwitching',
    value: function onSwitching(index, mode) {
      if (this._tabHeader) {
        this._tabHeader.syncGuide(index, mode);
      }
      if (mode === 'move' && !this.isAligned) {
        this.isAligned = true;
        var scrollTop = window.scrollY;

        for (var i = 0; i < this.props.tabs.length; i++) {
          if (i !== this.props.index) {
            this._tabs[i].translateY(scrollTop - (this._scrollPosition[i] || 0));
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          mode = _props.mode,
          cacheRange = _props.cacheRange,
          index = _props.index,
          onChangeIndex = _props.onChangeIndex,
          tabs = _props.tabs,
          tabComponent = _props.tabComponent,
          tabHeight = _props.tabHeight,
          tabBackground = _props.tabBackground,
          tabIndicatorComponent = _props.tabIndicatorComponent,
          tabIndicatorStyle = _props.tabIndicatorStyle,
          _renderTabContent = _props.renderTabContent;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TabHeader2.default, {
          ref: function ref(_ref) {
            return _this3._tabHeader = _ref;
          },
          index: index,
          onChangeIndex: onChangeIndex,
          tabs: tabs,
          tabComponent: tabComponent,
          tabHeight: tabHeight,
          tabBackground: tabBackground,
          tabIndicatorComponent: tabIndicatorComponent,
          tabIndicatorStyle: tabIndicatorStyle,
          mode: mode
        }),
        _react2.default.createElement(
          _reactSwipeableViews2.default,
          {
            style: { paddingTop: tabHeight },
            index: index,
            onChangeIndex: onChangeIndex,
            onSwitching: this.onSwitching,
            resistance: true
          },
          tabs.map(function (tab, idx) {
            return _react2.default.createElement(_TabContent2.default, {
              key: idx,
              idx: tabs[idx].name,
              shouldLoad: idx >= index + cacheRange[0] && idx <= index + cacheRange[1],
              isShown: idx === index,
              renderTabContent: function renderTabContent() {
                return _renderTabContent(tab, idx);
              },
              ref: function ref(_ref2) {
                return _this3._tabs[idx] = _ref2;
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
  cacheRange: [-1, 1],
  springConfig: {
    duration: '0.35s',
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    delay: '0s'
  },
  tabHeight: 44,
  tabBackground: 'white',
  tabComponent: _Tab2.default.text(function (data) {
    return (0, _stringify2.default)(data);
  }),
  tabIndicatorComponent: _TabIndicator2.default
};
SwipeableTabs.childContextTypes = {
  snapTransition: _propTypes2.default.string
};
SwipeableTabs.propTypes = process.env.NODE_ENV !== "production" ? {
  cacheRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  index: _propTypes2.default.number.isRequired,
  onChangeIndex: _propTypes2.default.func.isRequired,
  renderTabContent: _propTypes2.default.func.isRequired,
  tabBackground: _propTypes2.default.string,
  tabComponent: _propTypes2.default.func,
  tabHeight: _propTypes2.default.number,
  tabIndicatorComponent: _propTypes2.default.func,
  tabIndicatorStyle: _propTypes2.default.object,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.object),
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