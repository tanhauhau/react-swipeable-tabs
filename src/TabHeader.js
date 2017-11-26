import React from 'react';
import PropTypes from 'prop-types';
import * as utils from './dom-utils';
import querySelectorAll from 'dom-helpers/query/querySelectorAll';
import warning from 'warning';

const styles = {
  tabHeader: {
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 10,
    overflowY: 'hidden',
    overflowX: 'scroll',
    WebkitOverflowScroll: 'touch',
  },
  tabList: {
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  tab: {
    display: 'inline-block',
  },
};

class TabHeader extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    tabBackground: PropTypes.string,
    tabComponent: PropTypes.func,
    tabHeight: PropTypes.number.isRequired,
    tabIndicatorComponent: PropTypes.func,
    tabIndicatorStyle: PropTypes.object,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    mode: 1,
  };

  static contextTypes = {
    snapTransition: PropTypes.string,
  };

  _tabIndicatorRef = null;
  _tabListRef = null;
  _tabsRef = [];
  _measurements = null;

  constructor(props) {
    super(props);
    this.onTabIndicatorTransitionEnd = this.onTabIndicatorTransitionEnd.bind(this);
  }

  syncGuide(index, mode) {
    if (
      !this._tabIndicatorRef ||
      !this._tabListRef ||
      typeof this._tabIndicatorRef.syncScroll !== 'function'
    ) {
      return;
    }
    if (this._measurements === null) {
      this.calculateMeasurements();
    }
    const floor = Math.floor(index);
    const ceil = Math.ceil(index);
    const from = this._measurements[floor];
    const to = this._measurements[ceil];
    const t = index - floor;
    this._tabIndicatorRef.syncScroll(from, to, t, mode);
    if (mode === 'end') {
      for (var i = 0; i < this._tabsRef.length; i++) {
        this.syncTabs(this._tabsRef[i], i === ceil ? 1 : 0, mode);
      }
    } else {
      this.syncTabs(this._tabsRef[floor], 1 - t, mode);
      this.syncTabs(this._tabsRef[ceil], t, mode);
    }
  }

  syncTabs(ref, t, mode) {
    if (ref && typeof ref.syncScroll === 'function') {
      ref.syncScroll(t, mode);
    }
  }

  calculateMeasurements() {
    this._measurements = Array.from(querySelectorAll(this._tabListRef, '.swipeable-tabs-tab')).map(
      tab => {
        return {
          left: tab.offsetLeft - this._tabListRef.offsetLeft,
          width: tab.offsetWidth,
        };
      },
    );
  }

  onTabIndicatorTransitionEnd() {
    const scrollContainer = this._tabListRef.parentNode;
    const scrollLeft = scrollContainer.scrollLeft;
    const containerWidth = scrollContainer.offsetWidth;
    const tabMeasurement = this._measurements[this.props.index];
    const left = tabMeasurement.left;
    const width = tabMeasurement.width;
    let scrollTo = scrollLeft;
    switch (this.props.mode) {
      case 1: {
        scrollTo = left - (containerWidth - width) / 2;
        break;
      }
      case 2: {
        const tabMeasurement2 = this._measurements[this.props.index + 1];
        if (!tabMeasurement2) {
          return;
        }
        scrollTo = tabMeasurement2.left - (containerWidth - tabMeasurement2.width);
        break;
      }
      case 3: {
        const tabMeasurementPrev = this._measurements[this.props.index - 1];
        const tabMeasurementNext = this._measurements[this.props.index + 1];
        if (tabMeasurementPrev && tabMeasurementPrev.left < scrollLeft) {
          scrollTo = tabMeasurementPrev.left;
        } else if (
          tabMeasurementNext &&
          tabMeasurementNext.left + tabMeasurementNext.width > scrollLeft + containerWidth
        ) {
          scrollTo = tabMeasurementNext.left - (containerWidth - tabMeasurementNext.width);
        }
        break;
      }
    }
    scrollTo = Math.min(scrollContainer.scrollWidth - containerWidth, Math.max(0, scrollTo));
    this.toOffsetScrollBy(scrollTo - scrollLeft);
  }

  toOffsetScrollBy(offset) {
    if (offset === 0) {
      return;
    }
    const scrollContainer = this._tabListRef.parentNode;
    scrollContainer.scrollLeft = scrollContainer.scrollLeft + offset;
    requestAnimationFrame(() => {
      utils.setTransition(this._tabListRef, '');
      utils.setTransform(this._tabListRef, `translate(${offset}px, 0)`);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          utils.setTransition(this._tabListRef, this.context.snapTransition);
          utils.setTransform(this._tabListRef, '');
        });
      });
    });
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
    const {
      index,
      onChangeIndex,
      tabs,
      tabBackground,
      tabComponent: TabComponent,
      tabHeight,
      tabIndicatorComponent: TabIndicator,
      tabIndicatorStyle,
    } = this.props;

    const tabListStyle = Object.assign({}, styles.tabList, { height: tabHeight });

    warning(
      TabComponent,
      `react-swipeable-tabs: tabComponent provided is ${TabComponent}.
    We are expecting a valid component.`,
    );
    warning(
      TabIndicator,
      `react-swipeable-tabs: tabComponent provided is ${TabIndicator}.
    We are expecting a valid component.`,
    );

    return (
      <div style={styles.tabHeader}>
        <div style={tabListStyle} ref={ref => (this._tabListRef = ref)}>
          {tabs.map((tab, idx) => {
            return (
              <div
                key={idx}
                className="swipeable-tabs-tab"
                onClick={() => onChangeIndex(idx)}
                style={styles.tab}
              >
                <TabComponent
                  height={tabHeight}
                  background={tabBackground}
                  data={tab}
                  ref={ref => (this._tabsRef[idx] = ref)}
                />
              </div>
            );
          })}
          {TabIndicator ? (
            <TabIndicator
              ref={ref => (this._tabIndicatorRef = ref)}
              tabIndicatorStyle={tabIndicatorStyle}
              onTabIndicatorTransitionEnd={this.onTabIndicatorTransitionEnd}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default TabHeader;
