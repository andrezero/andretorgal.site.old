import { Link as RouterLink } from '@reach/router';
import * as React from 'react';

const isExternal = (url: string): boolean => /^[a-z]+:/.test(url);

interface Props {
  href?: string;
  to?: string;
  anchor?: string;
  children?: React.ReactNode;
}

export default function Link(props: Props) {
  const { href, to, anchor, children } = props;
  const url = href || to || '/';
  const external = isExternal(href);
  if (external) {
    return <a href={url}>{children}</a>;
  } else {
    return <RouterLink to={`${url}#${anchor || 'top'}`}>{children}</RouterLink>;
  }
}
