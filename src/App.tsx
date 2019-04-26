import { Router } from '@reach/router';
import * as React from 'react';
import { Head, Root, Routes } from 'react-static';

import './app.css';

const defaultMeta = [
  {
    name: 'Author',
    content: 'André Torgal'
  }
];

function App() {
  return (
    <Root>
      <Head titleTemplate="%s - André Torgal" defaultTitle="André Torgal" meta={defaultMeta} />
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;
