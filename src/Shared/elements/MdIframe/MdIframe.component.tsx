import * as React from 'react';

import './MdIframe.scss';

interface Message {
  origin: string;
  data: {
    height: string;
  };
}

interface Props {
  src: string;
  [key: string]: any;
}

export class MdIframe extends React.Component<Props> {
  private ref: React.RefObject<HTMLIFrameElement>;
  private resized = 0;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();

    window.addEventListener('message', this.handleMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false);
  }

  handleMessage = (event: Message) => {
    const { src } = this.props;
    if (!src.startsWith(event.origin)) {
      return;
    }
    const height = parseInt(event.data.height);
    if (isNaN(height)) {
      return;
    }
    this.ref.current.height = height + 'px';
    this.resized++;
  };

  render() {
    const { src } = this.props;
    return <iframe className="md-iframe" src={src} ref={this.ref}></iframe>;
  }
}
