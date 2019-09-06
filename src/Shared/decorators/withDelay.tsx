import * as React from 'react';

export const withDelay = <P extends object>(Component: React.ComponentType, fn: () => any, delay: number) => {
  class DelayedComponent extends React.Component<{}> {
    timeout: number;
    componentWillMount() {
      const newState = fn();
      this.timeout = window.setTimeout(() => this.setState(() => newState), delay);
    }
    componentWillUnmount() {
      window.clearTimeout(this.timeout);
    }
    render() {
      const props = { ...this.state, ...this.props } as P;
      return <Component {...props} />;
    }
  }
  return DelayedComponent;
};
