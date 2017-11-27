import React from 'react';
import PropTypes from 'prop-types';

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
  maxHeight = WINDOW_HEIGHT;

  translateY(val) {
    if (this._ref) {
      const transform = `translate(0, ${val}px)`;
      this._ref.style.WebkitTransform = transform;
      this._ref.style.transform = transform;
    }
  }
  
  updateMaxHeight(maxHeight) {
    this.maxHeight = WINDOW_HEIGHT + maxHeight;
  }

  componentWillMount() {
    this.setState({ show: this.props.shouldLoad });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.shouldLoad !== this.props.shouldLoad) {
      setTimeout(() => {
        this.setState({ show: nextProps.shouldLoad })
      }, 1000);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isShown !== nextProps.isShown || this.state.show !== nextState.show;
  }

  render() {
    if (!this.state.show) {
      return <div />;
    }
    const style = this.props.isShown ? null : { maxHeight: this.maxHeight, overflowY: 'hidden' };
    return <div ref={ref => (this._ref = ref)} style={style}>{this.props.renderTabContent()}</div>;
  }
}
