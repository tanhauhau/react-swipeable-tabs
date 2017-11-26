import React from 'react';
import PropTypes from 'prop-types';

export default class TabContent extends React.Component {
  static propTypes = {
    renderTabContent: PropTypes.func,
    show: PropTypes.bool,
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }
  render() {
    if (!this.props.show) {
      return <div />;
    }
    return <div>{this.props.renderTabContent()}</div>;
  }
}
