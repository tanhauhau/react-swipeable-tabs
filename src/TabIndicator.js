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
    if (mode === 'move') {
      const translateX = linearInterpolate(from.left, to.left, t);
      const scaleX = linearInterpolate(from.width, to.width, t);
      this._transformIndicator('all 0s ease 0s', translateX, scaleX);
    } else {
      this._transformIndicator(this.context.snapTransition, to.left, to.width);
    }
  }

  _transformIndicator(transition, translateX, scaleX) {
    const transform = `translate(${translateX}px, 0) scale(${scaleX},1)`;
    requestAnimationFrame(() => {
      domUtils.setTransition(this._tabGuidRef, transition);
      domUtils.setTransform(this._tabGuidRef, transform);
    });
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
