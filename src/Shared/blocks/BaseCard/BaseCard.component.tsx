import * as React from 'react';

import { Link } from '../../elements/Link/Link.component';

interface Props {
  className: string;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  href?: string;
  draft?: boolean;
}

const makeClassNames = (href: string, className: string, draft: boolean): string => {
  const classNames = [className];
  if (href) {
    classNames.push('has-link');
  }
  if (draft) {
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

export const BaseCard: React.StatelessComponent<Props> = ({ className, header, children, footer, href, draft }) => {
  const classNames = makeClassNames(href, className, draft);
  const wrappedContent = wrapContent(header, children, href);
  return (
    <article className={classNames}>
      {wrappedContent}
      {footer && <footer>{footer}</footer>}
    </article>
  );
};
