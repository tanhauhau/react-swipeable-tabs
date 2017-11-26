import React from 'react';
import Tab from './BaseTab';

const create = (renderTab, sync) => {
  return class CustomTab extends Tab {
    sync = sync;
    renderTab = renderTab;
  };
};

export default create;
