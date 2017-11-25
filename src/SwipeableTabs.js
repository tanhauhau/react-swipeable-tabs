import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from './react-swipeable-views';
import TabHeader from './TabHeader';
import TabContent from './TabContent';
import TabIndicator from './TabIndicator';

class SwipeableTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    renderTab: PropTypes.func.isRequired,
    renderTabContent: PropTypes.func.isRequired,
    tabIndicatorComponent: PropTypes.func,
    tabIndicatorStyle: PropTypes.object,
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
      tabIndicatorComponent,
      tabIndicatorStyle,
      renderTab,
      renderTabContent,
    } = this.props;

    return (
      <div>
        <TabHeader
          ref={ref => (this._tabHeader = ref)}
          index={index}
          onChangeIndex={onChangeIndex}
          renderTab={renderTab}
          tabs={tabs}
          tabIndicatorComponent={tabIndicatorComponent}
          tabIndicatorStyle={tabIndicatorStyle}
          mode={mode}
        />
        <SwipeableViews index={index} onChangeIndex={onChangeIndex} onSwitching={this.onSwitching}>
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
