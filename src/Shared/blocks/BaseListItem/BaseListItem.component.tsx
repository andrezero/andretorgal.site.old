import * as React from 'react';
import { Link } from '../../elements/Link/Link.component';

interface Props {
  className: string;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  href?: string;
}

export const BaseListItem: React.StatelessComponent<Props> = ({ className, header, children, footer, href }) => {
  const classNames = [className];
  if (href) {
    classNames.push('has-link');
  }
  const content = (
    <>
      <header className="node-header">{header}</header>
      <div className="node-details">{children}</div>
    </>
  );
  const wrappedContent = href ? (
    <Link href={href} className="node-contents">
      {content}
    </Link>
  ) : (
    <div className="node-contents">{content}</div>
  );
  const item = (
    <article className={classNames.join(' ')}>
      {wrappedContent}
      {footer && <footer className="node-footer">{footer}</footer>}
    </article>
  );
  return item;
};
