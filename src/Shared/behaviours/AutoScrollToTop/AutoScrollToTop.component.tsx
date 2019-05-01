import * as React from 'react';
import { useRouteData } from 'react-static';

import { withRouteData } from '../../../Shared/RouteContext';
import { RouteData } from '../../../Shared/types/Route.model';

// props: https://gist.github.com/swernerx/2c2ba4e611b4ec7921813a71517ddf5a

let lastNavigationFromBrowserUI = true;

if (typeof (window as any) !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastNavigationFromBrowserUI = true;
  });
}

interface Props {
  children?: React.ReactNode;
}
export const AutoScrollToTop: React.StatelessComponent<Props> = ({ children }) => {
  if (lastNavigationFromBrowserUI) {
    lastNavigationFromBrowserUI = false;
  } else {
    if (typeof (window as any) !== 'undefined') {
      window.setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1);
    }
  }
  const routeData: RouteData = useRouteData();
  return withRouteData(<>{children}</>, routeData);
};
