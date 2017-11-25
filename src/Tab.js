import React from 'react';
import PropTypes from 'prop-types';

const tabStyle = {
  display: 'inline-block',
};

export default class Tab extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };
  syncScroll() {}
  render() {
    return (
      <div className="swipeable-tabs-tab" style={tabStyle} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
