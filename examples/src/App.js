import React, { Component } from 'react';
import './App.css';
import SwipeableTab from 'react-swipeable-tabs';
import category from './fixture/category.json';

const a = [1,2,3,4,5,6,7,8,9,10];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      mode: 1,
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          {[1,2,3].map(i => (
            <span key={i} className={`mode ${i === this.state.mode ? 'mode-selected' : ''}`} onClick={() => this.setState({mode: i})}>
              {i}
            </span>
          ))}
        </div>
        <SwipeableTab
          mode={this.state.mode}
          tabs={category}
          index={this.state.index}
          onChangeIndex={index => this.setState({index})}
          tabIndicatorStyle={{ backgroundColor: 'red' }}
          renderTab={(tab, index, selected) => (
            <div className={`tab ${selected?'tab-selected':''}`}>{tab.name}</div>
          )}
          renderTabContent={(tab, index) => {
            return (
            <div>
              { a.map((_, idx) => <li key={idx}>{`${idx} ${tab.name}`}</li>) }
            </div>
            )
          }}
        />
      </div>
    );
  }
}

export default App;
