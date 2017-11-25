import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from './react-swipeable-views';
import TabHeader from './TabHeader';
import TabContent from './TabContent';

export default class SwipeableTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    renderTab: PropTypes.func.isRequired,
    renderTabContent: PropTypes.func.isRequired,
    tabGuideStyle: PropTypes.object,
  };
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
    const { mode, index, onChangeIndex, tabs, tabGuideStyle, tabGuideInterpolation, renderTab, renderTabContent } = this.props;

    return (
      <div>
        <TabHeader 
          ref={ref => (this._tabHeader = ref)}
          index={index}
          onChangeIndex={onChangeIndex}
          renderTab={renderTab}
          tabs={tabs}
          tabGuideStyle={tabGuideStyle}
          tabGuideInterpolation={tabGuideInterpolation}
          mode={mode}
        />
        <SwipeableViews
          index={index} onChangeIndex={onChangeIndex}
          onSwitching={this.onSwitching}>
          { tabs.map((tab, idx) => (
              <TabContent
                key={idx}
                show={idx >= index-1 && idx <= index+1}
                renderTabContent={() => renderTabContent(tab, idx) }
              />
            ))
          }
        </SwipeableViews>
      </div>
    );
  }
}
