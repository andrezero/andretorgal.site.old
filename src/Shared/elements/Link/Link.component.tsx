import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const isExternal = (url: string): boolean => /^[a-z]+:/.test(url);
const isFragment = (url: string): boolean => /^#.+/.test(url);

interface Props {
  href?: string;
  to?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const external = (url: string, id: string, className: string, children?: React.ReactNode) => {
  const props = { href: url, id, className };
  return <a {...props}>{children}</a>;
};

const internal = (url: string, id: string, className: string, children?: React.ReactNode) => {
  const props = { to: url, id, className };
  return <RouterLink {...props}>{children}</RouterLink>;
};

export const Link: React.StatelessComponent<Props> = ({ href, to, id, className, children }) => {
  const url = href || to || '/';
  const render = isExternal(href) || isFragment(href) ? external : internal;
  return render(url, id, className, children);
};
