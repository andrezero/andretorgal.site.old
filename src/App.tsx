import { Router } from '@reach/router';
import * as React from 'react';
import { Head, Root, Routes } from 'react-static';

import './app.css';

import Anchor from './atoms/Anchor/Anchor.component';
import Link from './atoms/Link/Link.component';

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
