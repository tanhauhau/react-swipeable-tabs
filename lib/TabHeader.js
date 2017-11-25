'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  tabHeader: {
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'scroll',
    WebkitOverflowScroll: 'touch'
  },
  tabList: {},
  tabGuide: {
    width: 1,
    height: 4,
    position: 'absolute',
    left: 0,
    bottom: 0,
    transformOrigin: 0
  }
};

function defaultInterpolate(from, to, t) {
  return t === 0 ? from : t === 1 ? to : from + (to - from) * t;
}

function generateInterpolation(obj, from, to, t) {
  return (0, _keys2.default)(obj).reduce(function (_interpolation, key) {
    _interpolation[key] = obj[key](from[key], to[key], t);
    return _interpolation;
  }, {});
}

var TabHeader = function (_React$Component) {
  (0, _inherits3.default)(TabHeader, _React$Component);

  function TabHeader(props) {
    (0, _classCallCheck3.default)(this, TabHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabHeader.__proto__ || (0, _getPrototypeOf2.default)(TabHeader)).call(this, props));

    _this._tabGuidRef = null;
    _this._tabListRef = null;
    _this._measurements = null;

    _this.onTabGuideTransitionEnd = _this.onTabGuideTransitionEnd.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TabHeader, [{
    key: 'syncGuide',
    value: function syncGuide(index, mode) {
      if (!this._tabGuidRef || !this._tabListRef) return;
      if (this._measurements === null) {
        this.calculateMeasurements();
      }
      if (mode === 'move') {
        var floor = Math.floor(index);
        var ceil = Math.ceil(index);
        var from = this._measurements[floor];
        var to = this._measurements[ceil];
        var t = index - floor;
        var interpolation = generateInterpolation(this.props.tabGuideInterpolation, from, to, t);

        this._syncGuide('all 0s ease 0s', interpolation);
      } else {
        var _to = this._measurements[index];
        var _interpolation2 = generateInterpolation(this.props.tabGuideInterpolation, _to, _to, 0);
        this._syncGuide('all ' + this.props.springConfig.duration + ' ' + this.props.springConfig.easeFunction + ' ' + this.props.springConfig.delay, _interpolation2);
      }
    }
  }, {
    key: '_syncGuide',
    value: function _syncGuide(transition, interpolation) {
      var _this2 = this;

      var _interpolation$transl = interpolation.translateX,
          translateX = _interpolation$transl === undefined ? 0 : _interpolation$transl,
          _interpolation$transl2 = interpolation.translateY,
          translateY = _interpolation$transl2 === undefined ? 0 : _interpolation$transl2,
          _interpolation$scaleX = interpolation.scaleX,
          scaleX = _interpolation$scaleX === undefined ? 1 : _interpolation$scaleX,
          _interpolation$scaleY = interpolation.scaleY,
          scaleY = _interpolation$scaleY === undefined ? 1 : _interpolation$scaleY,
          others = (0, _objectWithoutProperties3.default)(interpolation, ['translateX', 'translateY', 'scaleX', 'scaleY']);

      var transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ',' + scaleY + ')';
      requestAnimationFrame(function () {
        _this2._tabGuidRef.style.transition = transition;
        _this2._tabGuidRef.style.WebkitTransition = transition;
        _this2._tabGuidRef.style.transform = transform;
        _this2._tabGuidRef.style.WebkitTransform = transform;
        var keys = (0, _keys2.default)(others);
        for (var i = 0; i < keys.length; i++) {
          _this2._tabGuidRef.style[keys[i]] = others[keys[i]];
        }
      });
    }
  }, {
    key: 'calculateMeasurements',
    value: function calculateMeasurements() {
      var _this3 = this;

      this._measurements = (0, _from2.default)(this._tabListRef.querySelectorAll('.swipeable-tabs-tab')).map(function (tab) {
        return {
          translateX: tab.offsetLeft - _this3._tabListRef.offsetLeft,
          scaleX: tab.offsetWidth
        };
      });
    }
  }, {
    key: 'onTabGuideTransitionEnd',
    value: function onTabGuideTransitionEnd() {
      var scrollContainer = this._tabListRef.parentNode;
      var scrollLeft = scrollContainer.scrollLeft;
      var containerWidth = scrollContainer.offsetWidth;
      var tabMeasurement = this._measurements[this.props.index];
      var left = tabMeasurement.translateX;
      var width = tabMeasurement.scaleX;
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
            scrollTo = tabMeasurement2.translateX - (containerWidth - tabMeasurement2.scaleX);
            break;
          }
        case 3:
          {
            var tabMeasurementPrev = this._measurements[this.props.index - 1];
            var tabMeasurementNext = this._measurements[this.props.index + 1];
            if (tabMeasurementPrev && tabMeasurementPrev.translateX < scrollLeft) {
              scrollTo = tabMeasurementPrev.translateX;
            } else if (tabMeasurementNext && tabMeasurementNext.translateX + tabMeasurementNext.scaleX > scrollLeft + containerWidth) {
              scrollTo = tabMeasurementNext.translateX - (containerWidth - tabMeasurementNext.scaleX);
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
      var _this4 = this;

      var scrollContainer = this._tabListRef.parentNode;
      scrollContainer.scrollLeft = scrollContainer.scrollLeft + offset;
      requestAnimationFrame(function () {
        _this4._tabListRef.style.transition = '';
        _this4._tabListRef.style.WebkitTransition = '';
        _this4._tabListRef.style.transform = 'translate(' + offset + 'px, 0)';
        _this4._tabListRef.style.WebkitTransform = 'translate(' + offset + 'px, 0)';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this4._tabListRef.style.transition = 'all ' + _this4.props.springConfig.duration + ' ' + _this4.props.springConfig.easeFunction + ' ' + _this4.props.springConfig.delay;
            _this4._tabListRef.style.WebkitTransition = 'all ' + _this4.props.springConfig.duration + ' ' + _this4.props.springConfig.easeFunction + ' ' + _this4.props.springConfig.delay;
            _this4._tabListRef.style.transform = '';
            _this4._tabListRef.style.WebkitTransform = '';
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
      var _this5 = this;

      var _props = this.props,
          index = _props.index,
          onChangeIndex = _props.onChangeIndex,
          tabs = _props.tabs,
          tabGuideStyleProp = _props.tabGuideStyle,
          renderTab = _props.renderTab;


      var tabGuideStyle = (0, _extends3.default)({}, styles.tabGuide, tabGuideStyleProp);

      return _react2.default.createElement(
        'div',
        { style: styles.tabHeader },
        _react2.default.createElement(
          'div',
          { style: styles.tabList, ref: function ref(_ref2) {
              return _this5._tabListRef = _ref2;
            } },
          tabs.map(function (tab, idx) {
            return _react2.default.createElement(
              _Tab2.default,
              { key: idx, onClick: function onClick() {
                  return onChangeIndex(idx);
                } },
              renderTab(tab, idx, index === idx)
            );
          }),
          _react2.default.createElement('i', { style: tabGuideStyle, ref: function ref(_ref) {
              return _this5._tabGuidRef = _ref;
            }, onTransitionEnd: this.onTabGuideTransitionEnd })
        )
      );
    }
  }]);
  return TabHeader;
}(_react2.default.Component);

TabHeader.defaultProps = {
  tabGuideInterpolation: {
    translateX: defaultInterpolate,
    scaleX: defaultInterpolate
  },
  springConfig: {
    duration: '0.35s',
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    delay: '0s'
  },
  mode: 1
};
TabHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  renderTab: _propTypes2.default.func.isRequired,
  index: _propTypes2.default.number.isRequired,
  onChangeIndex: _propTypes2.default.func.isRequired,
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  // style related
  tabGuideStyle: _propTypes2.default.object,
  springConfig: _propTypes2.default.object
} : {};
exports.default = TabHeader;