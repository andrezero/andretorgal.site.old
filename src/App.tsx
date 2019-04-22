import { createHistory, HistorySource, LocationProvider, Router } from '@reach/router';
import * as React from 'react';
import { Root, Routes } from 'react-static';

import './app.css';

import Anchor from 'atoms/Anchor/Anchor.component';
import Link from 'atoms/Link/Link.component';
import Markdown from 'atoms/Markdown/Markdown.component';

function App() {
  return (
    <Root>
      <Anchor id="top" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Blog</Link>
      </nav>
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
