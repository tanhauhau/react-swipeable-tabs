'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

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

var _domUtils = require('./dom-utils');

var utils = _interopRequireWildcard(_domUtils);

var _querySelectorAll = require('dom-helpers/query/querySelectorAll');

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  tabHeader: {
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 10,
    overflowY: 'hidden',
    overflowX: 'scroll',
    WebkitOverflowScroll: 'touch'
  },
  tabList: {
    position: 'relative',
    whiteSpace: 'nowrap'
  },
  tab: {
    display: 'inline-block'
  }
};

var TabHeader = function (_React$Component) {
  (0, _inherits3.default)(TabHeader, _React$Component);

  function TabHeader(props) {
    (0, _classCallCheck3.default)(this, TabHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabHeader.__proto__ || (0, _getPrototypeOf2.default)(TabHeader)).call(this, props));

    _this._tabIndicatorRef = null;
    _this._tabListRef = null;
    _this._tabsRef = [];
    _this._measurements = null;

    _this.onTabIndicatorTransitionEnd = _this.onTabIndicatorTransitionEnd.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TabHeader, [{
    key: 'syncGuide',
    value: function syncGuide(index, mode) {
      if (!this._tabIndicatorRef || !this._tabListRef || typeof this._tabIndicatorRef.syncScroll !== 'function') {
        return;
      }
      if (this._measurements === null) {
        this.calculateMeasurements();
      }
      var floor = Math.floor(index);
      var ceil = Math.ceil(index);
      var from = this._measurements[floor];
      var to = this._measurements[ceil];
      var t = index - floor;
      this._tabIndicatorRef.syncScroll(from, to, t, mode);
      if (mode === 'end') {
        for (var i = 0; i < this._tabsRef.length; i++) {
          this.syncTabs(this._tabsRef[i], i === ceil ? 1 : 0, mode);
        }
      } else {
        this.syncTabs(this._tabsRef[floor], 1 - t, mode);
        this.syncTabs(this._tabsRef[ceil], t, mode);
      }
    }
  }, {
    key: 'syncTabs',
    value: function syncTabs(ref, t, mode) {
      if (ref && typeof ref.syncScroll === 'function') {
        ref.syncScroll(t, mode);
      }
    }
  }, {
    key: 'calculateMeasurements',
    value: function calculateMeasurements() {
      var _this2 = this;

      this._measurements = (0, _from2.default)((0, _querySelectorAll2.default)(this._tabListRef, '.swipeable-tabs-tab')).map(function (tab) {
        return {
          left: tab.offsetLeft - _this2._tabListRef.offsetLeft,
          width: tab.offsetWidth
        };
      });
    }
  }, {
    key: 'onTabIndicatorTransitionEnd',
    value: function onTabIndicatorTransitionEnd() {
      var scrollContainer = this._tabListRef.parentNode;
      var scrollLeft = scrollContainer.scrollLeft;
      var containerWidth = scrollContainer.offsetWidth;
      var tabMeasurement = this._measurements[this.props.index];
      var left = tabMeasurement.left;
      var width = tabMeasurement.width;
      var scrollTo = scrollLeft;
      switch (this.props.mode) {
        case 1:
          {
            scrollTo = left - (containerWidth - width) / 2;
            break;
          }
        case 2:
          {
            var tabMeasurement2 = this._measurements[this.props.index + 1];
            if (!tabMeasurement2) {
              return;
            }
            scrollTo = tabMeasurement2.left - (containerWidth - tabMeasurement2.width);
            break;
          }
        case 3:
          {
            var tabMeasurementPrev = this._measurements[this.props.index - 1];
            var tabMeasurementNext = this._measurements[this.props.index + 1];
            if (tabMeasurementPrev && tabMeasurementPrev.left < scrollLeft) {
              scrollTo = tabMeasurementPrev.left;
            } else if (tabMeasurementNext && tabMeasurementNext.left + tabMeasurementNext.width > scrollLeft + containerWidth) {
              scrollTo = tabMeasurementNext.left - (containerWidth - tabMeasurementNext.width);
            }
            break;
          }
      }
      scrollTo = Math.min(scrollContainer.scrollWidth - containerWidth, Math.max(0, scrollTo));
      this.toOffsetScrollBy(scrollTo - scrollLeft);
    }
  }, {
    key: 'toOffsetScrollBy',
    value: function toOffsetScrollBy(offset) {
      var _this3 = this;

      if (offset === 0) {
        return;
      }
      var scrollContainer = this._tabListRef.parentNode;
      scrollContainer.scrollLeft = scrollContainer.scrollLeft + offset;
      requestAnimationFrame(function () {
        utils.setTransition(_this3._tabListRef, '');
        utils.setTransform(_this3._tabListRef, 'translate(' + offset + 'px, 0)');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            utils.setTransition(_this3._tabListRef, _this3.context.snapTransition);
            utils.setTransform(_this3._tabListRef, '');
          });
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.tabs !== this.props.tabs) {
        this._measurements = null;
      }
      if (nextProps.index !== this.props) {
        this.syncGuide(nextProps.index, 'end');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncGuide(this.props.index, 'end');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          index = _props.index,
          onChangeIndex = _props.onChangeIndex,
          tabs = _props.tabs,
          tabBackground = _props.tabBackground,
          TabComponent = _props.tabComponent,
          tabHeight = _props.tabHeight,
          TabIndicator = _props.tabIndicatorComponent,
          tabIndicatorStyle = _props.tabIndicatorStyle;


      var tabListStyle = (0, _extends3.default)({}, styles.tabList, { height: tabHeight });

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(TabComponent, 'react-swipeable-tabs: tabComponent provided is ' + TabComponent + '.\n    We are expecting a valid component.') : void 0;
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(TabIndicator, 'react-swipeable-tabs: tabComponent provided is ' + TabIndicator + '.\n    We are expecting a valid component.') : void 0;

      return _react2.default.createElement(
        'div',
        { style: styles.tabHeader },
        _react2.default.createElement(
          'div',
          { style: tabListStyle, ref: function ref(_ref3) {
              return _this4._tabListRef = _ref3;
            } },
          tabs.map(function (tab, idx) {
            return _react2.default.createElement(
              'div',
              {
                key: idx,
                className: 'swipeable-tabs-tab',
                onClick: function onClick() {
                  return onChangeIndex(idx);
                },
                style: styles.tab
              },
              _react2.default.createElement(TabComponent, {
                height: tabHeight,
                background: tabBackground,
                data: tab,
                ref: function ref(_ref) {
                  return _this4._tabsRef[idx] = _ref;
                }
              })
            );
          }),
          TabIndicator ? _react2.default.createElement(TabIndicator, {
            ref: function ref(_ref2) {
              return _this4._tabIndicatorRef = _ref2;
            },
            tabIndicatorStyle: tabIndicatorStyle,
            onTabIndicatorTransitionEnd: this.onTabIndicatorTransitionEnd
          }) : null
        )
      );
    }
  }]);
  return TabHeader;
}(_react2.default.Component);

TabHeader.defaultProps = {
  mode: 1
};
TabHeader.contextTypes = {
  snapTransition: _propTypes2.default.string
};
TabHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  index: _propTypes2.default.number.isRequired,
  onChangeIndex: _propTypes2.default.func.isRequired,
  tabBackground: _propTypes2.default.string,
  tabComponent: _propTypes2.default.func,
  tabHeight: _propTypes2.default.number.isRequired,
  tabIndicatorComponent: _propTypes2.default.func,
  tabIndicatorStyle: _propTypes2.default.object,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
} : {};
exports.default = TabHeader;