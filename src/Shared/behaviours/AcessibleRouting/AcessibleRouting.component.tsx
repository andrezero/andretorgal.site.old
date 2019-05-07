import * as React from 'react';
import { useRouteData } from 'react-static';

import { withRouteData } from '../../RouteContext';
import { RouteData } from '../../types/Route.models';

// props: https://gist.github.com/swernerx/2c2ba4e611b4ec7921813a71517ddf5a

let firstNavigation = true;
let lastNavigationFromBrowserUI = true;

if (typeof (window as any) !== 'undefined') {
  window.addEventListener('popstate', () => {
    lastNavigationFromBrowserUI = true;
  });
}

const oneOf = (ids: string[]): HTMLElement => {
  let element;
  for (const id of ids) {
    element = document.getElementById(id);
    if (element) {
      return element;
    }
  }
};

const setFocus = (element: HTMLElement) => {
  element.focus();
  element.scrollIntoView();
};

interface Props {
  children?: React.ReactNode;
  focus?: string;
}

export const AcessibleRouting: React.StatelessComponent<Props> = ({ children, focus }) => {
  if (typeof (window as any) !== 'undefined') {
    window.setTimeout(() => {
      const { hash } = window.location;
      if (firstNavigation || !lastNavigationFromBrowserUI) {
        firstNavigation = false;
        lastNavigationFromBrowserUI = false;
        const element = oneOf([hash && hash.replace('#', ''), focus, 'root']);
        return setFocus(element);
      }
      lastNavigationFromBrowserUI = false;
    }, 250);
  }
  const routeData: RouteData = useRouteData();
  return withRouteData(<>{children}</>, routeData);
};
