import * as React from 'react';

import { Node } from '../../types/Node.models';

import { NodeImg } from '../../elements/NodeImg/NodeImg.component';

import './Hero.scss';

interface Props {
  node: Node;
  img: string;
  className?: string;
  children?: React.ReactNode;
}

export const Hero: React.StatelessComponent<Props> = ({ img, node, className, children }) => {
  const classNames = ['hero'];
  if (className) {
    classNames.push(className);
  }
  const profiles = ['image.medium', 'image.large', 'image.huge'];
  return (
    <section className={classNames.join(' ')}>
      <div className="banner">
        <NodeImg node={node} src={img} profiles={profiles} pad={false} className="cover" />
      </div>
      <div className="content">{children}</div>;
    </section>
  );
};
