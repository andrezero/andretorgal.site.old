import { Link as RouterLink } from '@reach/router';
import * as React from 'react';

const isExternal = (url: string): boolean => /^[a-z]+:/.test(url);

interface Props {
  href?: string;
  to?: string;
  children?: React.ReactNode;
}

export default function Link(props: Props) {
  const { children, href, to } = props;
  const url = href || to;
  return isExternal(href) ? <a href={url}>{children}</a> : <RouterLink to={url}>{children}</RouterLink>;
}
