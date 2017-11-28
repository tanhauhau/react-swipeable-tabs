import React from 'react';
import PropTypes from 'prop-types';
import * as domUtils from '../dom-utils';

const tabStyle = {
  display: 'inline-flex',
  alignItems: 'center',
};

export default class Tab extends React.Component {
  static propTypes = {
    background: PropTypes.string,
    height: PropTypes.number,
    onClick: PropTypes.func,
  };
  static contextTypes = {
    snapTransition: PropTypes.string,
  };
  static REF_NAME = '_ref';
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }
  syncScroll(t, mode) {
    if (!this._ref || typeof this.sync !== 'function') {
      return;
    }
    this._updateTransition(mode === 'move' ? 'all 0s ease 0s' : this.context.snapTransition);
    this.sync(this._ref, t, mode);
  }
  setRef(ref) {
    this._ref = ref;
  }
  _updateTransition(transition) {
    domUtils.setTransition(this._ref, transition);
  }
  render() {
    const { height, background, data } = this.props;
    const style = Object.assign({}, tabStyle, { height, background });
    return (
      <div ref={this.setRef} style={style}>
        {this.renderTab(data)}
      </div>
    );
  }

  /* template method */

  sync(ref, t, mode) {}

  renderTab(data) {
    return <span>{JSON.stringify(data)}</span>;
  }
}
