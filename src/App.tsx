import * as React from 'react';
import { Switch } from 'react-router-dom';
import { Head, Root, Routes } from 'react-static';

import { SiteLoading } from './Shared/elements/SiteLoading/SiteLoading.component';
import { withDelay } from './Shared/decorators/withDelay';

import './Shared/styles/_index.scss';

interface Props {
  children: React.ReactNode;
}

const SiteLoadingVisible = withDelay<{}>(SiteLoading, () => ({ show: true }), 500);
const SiteLoadingTimeout = withDelay<{}>(SiteLoadingVisible, () => ({ slow: true }), 2000);

export function App() {
  // @todo extract titleTemplate and defaultTitle to config
  return (
    <Root>
      <Head titleTemplate="%s - André Torgal" defaultTitle="André Torgal" />
      <React.Suspense fallback={<SiteLoadingTimeout />}>
        <Switch>
          <Routes path="" />
        </Switch>
      </React.Suspense>
    </Root>
  );
}
