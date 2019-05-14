import * as React from 'react';

import { ResponsiveImg, ResponsiveSrc } from '../../elements/ResponsiveImg/ResponsiveImg.component';

import './Hero.scss';

interface Props {
  children?: React.ReactNode;
  img: ResponsiveSrc;
  className?: string;
}

export const Hero: React.StatelessComponent<Props> = ({ children, img, className }) => {
  const classNames = ['hero'];
  if (className) {
    classNames.push(className);
  }
  return (
    <section className={classNames.join(' ')}>
      {img && <ResponsiveImg src={img} className="cover" />}
      <div className="hero-content">{children}</div>;
    </section>
  );
};
