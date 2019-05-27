import * as React from 'react';
import { Switch } from 'react-router-dom';
import { Head, Root, Routes } from 'react-static';

import { SiteLoading } from './Shared/elements/SiteLoading/SiteLoading.component';

import './Shared/styles/_index.scss';

interface Props {
  children: React.ReactNode;
}

export function App() {
  // @todo extract titleTemplate and defaultTitle to config
  return (
    <Root>
      <Head titleTemplate="%s - André Torgal" defaultTitle="André Torgal" />
      <React.Suspense fallback={<SiteLoading />}>
        <Switch>
          <Routes path="" />
        </Switch>
      </React.Suspense>
    </Root>
  );
}
