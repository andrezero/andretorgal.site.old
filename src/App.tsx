import * as React from 'react';
import { Switch } from 'react-router-dom';
import { Head, Root, Routes } from 'react-static';

import './Shared/styles/_index.scss';

const defaultMeta = [
  {
    name: 'Author',
    content: 'André Torgal'
  }
];

interface Props {
  children: React.ReactNode;
}

export function App() {
  return (
    <Root>
      <Head titleTemplate="%s - André Torgal" defaultTitle="André Torgal" meta={defaultMeta} />
      <React.Suspense fallback={<em>Loading...</em>}>
        <Switch>
          <Routes path="" />
        </Switch>
      </React.Suspense>
    </Root>
  );
}
