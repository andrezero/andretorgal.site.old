import * as React from 'react';

import { Link } from '../../elements/Link/Link.component';
import { NodeNotes } from '../../elements/NodeNotes/NodeNotes.component';
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

const makeClassNames = (node: Node, href: string, className: string): string => {
  const classNames = [className];
  if (href) {
    classNames.push('has-link');
  }
  if (hasTag(node, 'draft')) {
    classNames.push('is-draft');
  }
  return classNames.join(' ');
};

const wrapContent = (header: React.ReactNode, children: React.ReactNode, href: string) => {
  if (href) {
    return (
      <Link href={href} className="contents">
        <header>{header}</header>
        {children}
      </Link>
    );
  }
  return (
    <div className="contents">
      <header>{header}</header>
      {children}
    </div>
  );
};

const wrapFooter = (node: Node, footer: React.ReactNode) => {
  if (footer || node.meta.notes) {
    return (
      <footer>
        {footer}
        {node.meta.notes && <NodeNotes node={node} />}
      </footer>
    );
  }
};

export const BaseDetail: React.StatelessComponent<Props> = ({ node, className, header, children, footer, href }) => {
  const classNames = makeClassNames(node, href, className);
  const wrappedContent = wrapContent(header, children, href);
  const wrappedFooter = wrapFooter(node, footer);
  return (
    <article className={classNames}>
      {wrappedContent}
      {wrappedFooter}
    </article>
  );
};
