import React from 'react';
import PropTypes from 'prop-types';
import { cancelIdleCallback, requestIdleCallback } from './dom-utils';

const WINDOW_HEIGHT = window.innerHeight;

export default class TabContent extends React.Component {
  static propTypes = {
    /**
     * Tell this tab content that current tab is being shown
     */
    isShown: PropTypes.bool,
    /**
     * tab content, function to return react node
     */
    renderTabContent: PropTypes.func,
    /**
     * Tell this tab to preload data
     */
    shouldLoad: PropTypes.bool,
  };
  state = { show: false };
  _ref = null;
  // TODO initial max height, need to rethink this
  windowHeight = WINDOW_HEIGHT;
  maxHeight = this.windowHeight;

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  translateY(val) {
    if (this._ref) {
      const transform = `translate(0, ${val}px)`;
      this._ref.style.WebkitTransform = transform;
      this._ref.style.transform = transform;
    }
  }

  isHeightClamped = null;
  clampHeight(toClamp) {
    if (this._ref && this.isHeightClamped !== toClamp) {
      requestAnimationFrame(() => {
        if (!toClamp) {
          this._ref.style.maxHeight = null;
          this._ref.style.overflowY = null;
        } else {
          this._ref.style.maxHeight = `${this.windowHeight}px`;
          this._ref.style.overflowY = 'hidden';
        }
        this.isHeightClamped = toClamp;
      });
    }
  }

  setRef(ref) {
    this._ref = ref;
    if (ref) {
      // reset
      this.translateY(0);
      this.clampHeight(!this.props.isShown);
    }
  }

  componentWillMount() {
    this.setState({ show: this.props.shouldLoad });
  }

  componentDidMount() {
    if (this.props.shouldLoad && this.props.isShown) {
      this.clampHeight(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldLoad !== this.props.shouldLoad) {
      if (this.loadCallback) {
        cancelIdleCallback(this.loadCallback);
      }
      this.loadCallback = requestIdleCallback(() => {
        if (this.props.isShown) {
          this.setState({ show: nextProps.shouldLoad });
          this.loadCallback = null;
        } else {
          this.loadCallback = requestIdleCallback(() => {
            this.setState({ show: nextProps.shouldLoad });
            this.loadCallback = null;
          });
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.show !== nextState.show;
  }

  render() {
    if (!this.state.show) {
      return <div />;
    }
    return <div ref={this.setRef}>{this.props.renderTabContent()}</div>;
  }
}
