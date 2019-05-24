import * as React from 'react';

import { Link } from '../../elements/Link/Link.component';
import { hasTag } from '../../lib/nodes';
import { Node } from '../../types/Node.models';

interface Props {
  node: Node;
  className: string;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  href?: string;
}

export const BaseListItem: React.StatelessComponent<Props> = ({ node, className, header, children, footer, href }) => {
  const classNames = [className];
  if (href) {
    classNames.push('has-link');
  }
  if (hasTag(node, 'draft')) {
    classNames.push('is-draft');
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
