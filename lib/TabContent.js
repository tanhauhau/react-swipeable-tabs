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

var _ref = _react2.default.createElement('div', null);

var TabContent = function (_React$Component) {
  (0, _inherits3.default)(TabContent, _React$Component);

  // TODO initial max height, need to rethink this
  function TabContent(props) {
    (0, _classCallCheck3.default)(this, TabContent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabContent.__proto__ || (0, _getPrototypeOf2.default)(TabContent)).call(this, props));

    _this.state = { show: false };
    _this._ref = null;
    _this.windowHeight = WINDOW_HEIGHT;
    _this.maxHeight = _this.windowHeight;

    _this.setRef = _this.setRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TabContent, [{
    key: 'translateY',
    value: function translateY(val) {
      if (this._ref) {
        var transform = 'translate(0, ' + val + 'px)';
        this._ref.style.WebkitTransform = transform;
        this._ref.style.transform = transform;
      }
    }
  }, {
    key: 'updateMaxHeight',
    value: function updateMaxHeight(maxHeight) {
      // this.maxHeight = this.windowHeight + maxHeight;
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(show) {
      var _this2 = this;

      if (this._ref) {
        requestAnimationFrame(function () {
          console.log('maxheight', _this2.maxHeight);
          if (show) {
            _this2._ref.style.maxHeight = null;
            _this2._ref.style.overflowY = null;
          } else {
            _this2._ref.style.maxHeight = _this2.windowHeight + 'px';
            _this2._ref.style.overflowY = 'hidden';
          }
        });
      }
    }
  }, {
    key: 'setRef',
    value: function setRef(ref) {
      this._ref = ref;
      if (ref) {
        this.translateY(0);
        //   const { top } = ref.getBoundingClientRect();
        //   this.windowHeight = WINDOW_HEIGHT - top;
        //   // console.log('windowheight', WINDOW_HEIGHT, top)
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ show: this.props.shouldLoad });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.shouldLoad && !this.props.isShown) {
        this.setMaxHeight(false);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.shouldLoad !== this.props.shouldLoad) {
        setTimeout(function () {
          _this3.setState({ show: nextProps.shouldLoad });
        }, 1000);
      }
      if (nextProps.isShown !== this.props.isShown || nextProps.shouldLoad !== this.props.shouldLoad) {
        this.setMaxHeight(nextProps.isShown);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.show !== nextState.show;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.show) {
        return _ref;
      }
      return _react2.default.createElement(
        'div',
        { ref: this.setRef },
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