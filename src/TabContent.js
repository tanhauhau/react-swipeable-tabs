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
    const style = this.props.isShown ? null : { maxHeight: WINDOW_HEIGHT, overflowY: 'hidden' };
    return <div style={style}>{this.props.renderTabContent()}</div>;
  }
}
