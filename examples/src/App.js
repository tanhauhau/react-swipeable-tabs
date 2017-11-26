import React, { Component } from 'react';
import './App.css';
import SwipeableTab, { Tab } from 'react-swipeable-tabs';
import category from './fixture/category.json';

const len = {};
for (var i = 0; i < category.length; i++) {
  const l = Math.random() * 80 + 30;
  len[i] = [];
  for (var j = 0; j < l; j++) {
    len[i].push(j);
  }
}

const CustomTab2 = Tab.text(data => data.name, 
  {
    style: { padding: 20 },
    sync: function(ref, t, mode) {
      const transform = `scale(${1+0.05*t})`;
      this._ref.style.transform = transform;
      this._ref.style.WebkitTransform = transform;
      this._ref.style.color = `rgb(${Math.round(t * 255)},0,0)`;
    }
  }
);

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
        <div className="mode-selector">
          {[1,2,3].map(i => (
            <span key={i} className={`mode ${i === this.state.mode ? 'mode-selected' : ''}`} onClick={() => this.setState({mode: i})}>
              {i}
            </span>
          ))}
        </div>
        <div className="tab-container">
          <SwipeableTab
            mode={this.state.mode}
            tabs={category}
            tabComponent={CustomTab2}
            index={this.state.index}
            onChangeIndex={index => this.setState({index})}
            tabIndicatorStyle={{ backgroundColor: 'red' }}
            renderTabContent={(tab, index) => {
              return (
              <div>
                { len[index].map((_, idx) => <li key={idx}>{`${idx} ${tab.name}`}</li>) }
              </div>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
