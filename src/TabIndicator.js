import React from 'react';
import PropTypes from 'prop-types';
import { linearInterpolate } from './utils';
import * as domUtils from './dom-utils';

const tabIndicatorStyle = {
  width: 1,
  height: 4,
  position: 'absolute',
  left: 0,
  bottom: 0,
  transformOrigin: 0,
};

export default class TabIndicator extends React.Component {
  static contextTypes = {
    snapTransition: PropTypes.string,
  };

  _tabGuidRef = null;

  syncScroll(from, to, t, mode) {
    if (!this._tabGuidRef) {
      return;
    }
    // at the edge
    if (!from) {
      from = { left: -to.width, width: to.width };
    }
    if (!to) {
      to = { left: from.width * 2 + from.left, width: from.width };
    }
    requestAnimationFrame(() => {
      this._updateTransition(mode === 'move' ? 'all 0s ease 0s' : this.context.snapTransition);
      if (mode === 'move') {
        const translateX = linearInterpolate(from.left, to.left, t);
        const scaleX = linearInterpolate(from.width, to.width, t);
        this._transformIndicator(translateX, scaleX);
      } else {
        this._transformIndicator(to.left, to.width);
      }
    });
  }

  _updateTransition(transition) {
    domUtils.setTransition(this._tabGuidRef, transition);
  }

  _transformIndicator(translateX, scaleX) {
    const transform = `translate(${translateX}px, 0) scale(${scaleX},1)`;
    domUtils.setTransform(this._tabGuidRef, transform);
  }

  render() {
    const { tabIndicatorStyle: tabIndicatorStyleProp, onTabIndicatorTransitionEnd } = this.props;
    const style = Object.assign({}, tabIndicatorStyle, tabIndicatorStyleProp);
    return (
      <i
        style={style}
        ref={ref => (this._tabGuidRef = ref)}
        onTransitionEnd={onTabIndicatorTransitionEnd}
      />
    );
  }
}
