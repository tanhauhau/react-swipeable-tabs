import React from 'react';
import Tab from './BaseTab';

const create = (toString, { sync, ...props } = {}) => {
  return class TextTab extends Tab {
    sync = sync;
    renderTab(data) {
      return <div {...props}>{toString(data)}</div>;
    }
  };
};

export default create;
