import * as React from 'react';

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

export class AutoScrollToTop extends React.Component<Props> {
  public componentDidMount() {
    if (lastNavigationFromBrowserUI) {
      lastNavigationFromBrowserUI = false;
    } else {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}
