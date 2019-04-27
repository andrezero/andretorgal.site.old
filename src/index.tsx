import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

// exported for static rendering
export default App;

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root');

  const renderMethod = target.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

  const render = (Comp: React.FC, props: {}) => {
    renderMethod(<Comp {...props} />, target);
  };

  // Render!
  render(App, {});

  // Hot Module Replacement
  const m = module as any;
  if (m && m.hot) {
    m.hot.accept('./App', () => {
      render(App, {});
    });
  }
}
