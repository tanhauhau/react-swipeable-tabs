import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from './react-swipeable-views';
import TabHeader from './TabHeader';
import TabContent from './TabContent';
import TabIndicator from './TabIndicator';
import Tab from './Tab';

class SwipeableTabs extends React.Component {
  static propTypes = {
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

  constructor(props) {
    super(props);
    this.onSwitching = this.onSwitching.bind(this);
  }

  onSwitching(index, mode) {
    if (this._tabHeader) {
      this._tabHeader.syncGuide(index, mode);
    }
  }
  render() {
    const {
      mode,
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
              show={idx >= index - 1 && idx <= index + 1}
              renderTabContent={() => renderTabContent(tab, idx)}
            />
          ))}
        </SwipeableViews>
      </div>
    );
  }
}

export default SwipeableTabs;
