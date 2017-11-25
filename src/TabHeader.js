import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const styles = {
  tabHeader: {
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'scroll',
    WebkitOverflowScroll: 'touch',
  },
  tabList: {
  },
  tabGuide: {
    width: 1,
    height: 4,
    position: 'absolute',
    left: 0,
    bottom: 0,
    transformOrigin: 0,
  },
};

function defaultInterpolate (from, to, t) {
  return t === 0 ? from : t === 1 ? to : from + (to - from) * t;
} 

function generateInterpolation (obj, from, to, t) {
  return Object.keys(obj)
    .reduce((_interpolation, key) => {
    _interpolation[key] = obj[key](from[key], to[key], t);
    return _interpolation;
  }, {});
}

class TabHeader extends React.Component {
  static propTypes = {
    renderTab: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    // style related
    tabGuideStyle: PropTypes.object,
    springConfig: PropTypes.object,
  };

  static defaultProps = {
    tabGuideInterpolation: {
      translateX: defaultInterpolate,
      scaleX: defaultInterpolate,
    },
    springConfig: {
      duration: '0.35s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s',
    },
    mode: 1,
  }

  _tabGuidRef = null;
  _tabListRef = null;
  _measurements = null;

  constructor(props) {
    super(props);
    this.onTabGuideTransitionEnd = this.onTabGuideTransitionEnd.bind(this);
  }

  syncGuide (index, mode) {
    if (!this._tabGuidRef || !this._tabListRef) return;
    if (this._measurements === null) {
      this.calculateMeasurements();
    }
    if (mode === 'move') {
      const floor = Math.floor(index);
      const ceil = Math.ceil(index);
      const from = this._measurements[floor];
      const to = this._measurements[ceil];
      const t = index - floor;
      const interpolation = generateInterpolation(this.props.tabGuideInterpolation, from, to, t);

      this._syncGuide('all 0s ease 0s', interpolation);
    } else {
      const to = this._measurements[index];
      const interpolation = generateInterpolation(this.props.tabGuideInterpolation, to, to, 0);
      this._syncGuide(`all ${this.props.springConfig.duration} ${this.props.springConfig.easeFunction} ${this.props.springConfig.delay}`, interpolation);
    }
  }

  _syncGuide(transition, interpolation) {
    const { 
      translateX = 0,
      translateY = 0,
      scaleX = 1,
      scaleY = 1,
      ...others
    } = interpolation;
    const transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX},${scaleY})`;
    requestAnimationFrame(() => {
      this._tabGuidRef.style.transition = transition;
      this._tabGuidRef.style.WebkitTransition = transition;
      this._tabGuidRef.style.transform = transform;
      this._tabGuidRef.style.WebkitTransform = transform;
      const keys = Object.keys(others);
      for (var i = 0; i < keys.length; i++) {
        this._tabGuidRef.style[keys[i]] = others[keys[i]];
      }
    })
  }

  calculateMeasurements() {
    this._measurements = Array.from(this._tabListRef.querySelectorAll('.swipeable-tabs-tab')).map(tab => {
      return {
        translateX: tab.offsetLeft - this._tabListRef.offsetLeft,
        scaleX: tab.offsetWidth,
      }
    });
  }

  onTabGuideTransitionEnd() {
    const scrollContainer = this._tabListRef.parentNode;
    const scrollLeft = scrollContainer.scrollLeft;
    const containerWidth = scrollContainer.offsetWidth;
    const tabMeasurement = this._measurements[this.props.index];
    const left = tabMeasurement.translateX;
    const width = tabMeasurement.scaleX;
    let scrollTo = scrollLeft;
    switch(this.props.mode) {
      case 1: {
        scrollTo = left - (containerWidth-width)/2;
        break;
      }
      case 2: {
        const tabMeasurement2 = this._measurements[this.props.index + 1];
        if (!tabMeasurement2) { return; }
        scrollTo = tabMeasurement2.translateX - (containerWidth - tabMeasurement2.scaleX);
        break;
      }
      case 3: {
        const tabMeasurementPrev = this._measurements[this.props.index - 1];
        const tabMeasurementNext = this._measurements[this.props.index + 1];
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

  toOffsetScrollBy(offset) {
    const scrollContainer = this._tabListRef.parentNode;
    scrollContainer.scrollLeft = scrollContainer.scrollLeft + offset;
    requestAnimationFrame(() => {
      this._tabListRef.style.transition = '';
      this._tabListRef.style.WebkitTransition = '';
      this._tabListRef.style.transform = `translate(${offset}px, 0)`;
      this._tabListRef.style.WebkitTransform = `translate(${offset}px, 0)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this._tabListRef.style.transition = `all ${this.props.springConfig.duration} ${this.props.springConfig.easeFunction} ${this.props.springConfig.delay}`
          this._tabListRef.style.WebkitTransition = `all ${this.props.springConfig.duration} ${this.props.springConfig.easeFunction} ${this.props.springConfig.delay}`
          this._tabListRef.style.transform = '';
          this._tabListRef.style.WebkitTransform = '';
        })
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabs !== this.props.tabs) {
      this._measurements = null;
    }
    if (nextProps.index !== this.props) {
      this.syncGuide(nextProps.index, 'end');
    }
  }

  componentDidMount() {
    this.syncGuide(this.props.index, 'end');
  }

  render() {
    const { index, onChangeIndex, tabs, tabGuideStyle: tabGuideStyleProp, renderTab } = this.props;

    const tabGuideStyle = Object.assign({}, styles.tabGuide, tabGuideStyleProp);

    return (
      <div style={styles.tabHeader}>
        <div style={styles.tabList} ref={ref => (this._tabListRef = ref)}>
          {tabs.map((tab, idx) => {
            return (
              <Tab key={idx} onClick={() => onChangeIndex(idx)}>
                {renderTab(tab, idx, index === idx)}
              </Tab>
            );
          })}
          <i style={tabGuideStyle} ref={ref => (this._tabGuidRef = ref)} onTransitionEnd={this.onTabGuideTransitionEnd}/>
        </div>
      </div>
    );
  }
}

export default TabHeader;
