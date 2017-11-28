import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import TabHeader from './TabHeader';
import TabContent from './TabContent';
import TabIndicator from './TabIndicator';
import Tab from './Tab';
import { onPassiveScroll } from './dom-utils';

class SwipeableTabs extends React.Component {
  static propTypes = {
    cacheRange: PropTypes.arrayOf(PropTypes.number),
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    renderTabContent: PropTypes.func.isRequired,
    tabBackground: PropTypes.string,
    tabComponent: PropTypes.func,
    tabHeight: PropTypes.number,
    tabIndicatorComponent: PropTypes.func,
    tabIndicatorStyle: PropTypes.object,
    tabs: PropTypes.arrayOf(PropTypes.object),
    /**
     * This is the config used to create CSS transitions.
     * This is useful to change the dynamic of the transition.
     */
    springConfig: PropTypes.shape({
      duration: PropTypes.string,
      easeFunction: PropTypes.string,
      delay: PropTypes.string,
    }),
  };

  static defaultProps = {
    cacheRange: [-1, 1],
    springConfig: {
      duration: '0.35s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s',
    },
    tabHeight: 44,
    tabBackground: 'white',
    tabComponent: Tab.text(data => JSON.stringify(data)),
    tabIndicatorComponent: TabIndicator,
  };

  static childContextTypes = {
    snapTransition: PropTypes.string,
  };

  getChildContext() {
    const { springConfig: { duration, easeFunction, delay } } = this.props;
    return {
      snapTransition: `all ${duration} ${easeFunction} ${delay}`,
    };
  }

  _tabHeader = null;
  _tabs = [];
  _offPassiveScroll = null;
  _scrollPosition = [];

  constructor(props) {
    super(props);
    this.onSwitching = this.onSwitching.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window._scrollPosition = this._scrollPosition;
    this._offPassiveScroll = onPassiveScroll(window, this.handleScroll);
  }
  componentWillUnmount() {
    if (typeof this._offPassiveScroll === 'function') {
      this._offPassiveScroll();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.resetScroll(nextProps.index);
    }
  }

  handleScroll(e) {
    this.isAligned = false;
    return;

    // don't do translate Y on scroll
    if (this.ignoreScroll) {
      this.ignoreScroll = false;
      return;
    }
    const scrollTop = window.scrollY;
    for (let i = 0; i < this.props.tabs.length; i++) {
      if (i !== this.props.index) {
        this._tabs[i].translateY(scrollTop - (this._scrollPosition[i] || 0));
      } else {
        this._scrollPosition[i] = scrollTop;
        this._tabs[i].updateMaxHeight(scrollTop);
      }
    }
  }

  resetScroll(index) {
    this._scrollPosition[this.props.index] = window.scrollY;
    requestAnimationFrame(() => {
      // this._tabs[index].translateY(0);
      for (let i = 0; i < this.props.tabs.length; i++) {
        if (i !== index) {
          this._tabs[i].translateY(-(this._scrollPosition[i] || 0) + (this._scrollPosition[index] || 0));
        } else {
          this._tabs[i].translateY(0);
        }
      }
      // TODO how do you make sure you always able to scroll to that position
      window.scrollTo(window.scrollX, this._scrollPosition[index] || 0);
    });
  }

  onSwitching(index, mode) {
    if (this._tabHeader) {
      this._tabHeader.syncGuide(index, mode);
    }
    if (mode === 'move' && !this.isAligned) {
      this.isAligned = true;
      const scrollTop = window.scrollY;
      
      for (let i = 0; i < this.props.tabs.length; i++) {
        if (i !== this.props.index) {
          this._tabs[i].translateY(scrollTop - (this._scrollPosition[i] || 0));
        }
      }
    }
  }

  render() {
    const {
      mode,
      cacheRange,
      index,
      onChangeIndex,
      tabs,
      tabComponent,
      tabHeight,
      tabBackground,
      tabIndicatorComponent,
      tabIndicatorStyle,
      renderTabContent,
    } = this.props;

    return (
      <div>
        <TabHeader
          ref={ref => (this._tabHeader = ref)}
          index={index}
          onChangeIndex={onChangeIndex}
          tabs={tabs}
          tabComponent={tabComponent}
          tabHeight={tabHeight}
          tabBackground={tabBackground}
          tabIndicatorComponent={tabIndicatorComponent}
          tabIndicatorStyle={tabIndicatorStyle}
          mode={mode}
        />
        <SwipeableViews
          style={{ paddingTop: tabHeight }}
          index={index}
          onChangeIndex={onChangeIndex}
          onSwitching={this.onSwitching}
          resistance={true}
        >
          {tabs.map((tab, idx) => (
            <TabContent
              key={idx}
              shouldLoad={idx >= index + cacheRange[0] && idx <= index + cacheRange[1]}
              isShown={idx === index}
              renderTabContent={() => renderTabContent(tab, idx)}
              ref={ref => (this._tabs[idx] = ref)}
            />
          ))}
        </SwipeableViews>
      </div>
    );
  }
}

export default SwipeableTabs;
