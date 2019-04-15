import * as React from 'react';

interface Props {
  path: string;
}

export default class Dynamic extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        This is a dynamic page! It will not be statically exported, but is available at runtime
      </div>
    );
  }
}
