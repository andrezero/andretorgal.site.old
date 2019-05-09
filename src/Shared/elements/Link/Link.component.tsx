import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const isExternal = (url: string): boolean => /^[a-z]+:/.test(url);
const isFragment = (url: string): boolean => /^#.+/.test(url);

interface ComponentProps {
  href?: string;
  children?: React.ReactNode;
}

type Props = ComponentProps & React.HTMLProps<HTMLElement>;

const external = (url: string, props: Props) => {
  const { children, ...rest } = props;
  return (
    <a {...rest as React.ClassAttributes<HTMLAnchorElement>} href={url}>
      {children}
    </a>
  );
};

const internal = (url: string, props: Props) => {
  const { children, ...rest } = props;
  return (
    <RouterLink {...rest as React.ClassAttributes<RouterLink>} to={url}>
      {children}
    </RouterLink>
  );
};

export const Link: React.StatelessComponent<Props> = props => {
  const { href = '/' } = props;
  const render = isExternal(href) || isFragment(href) ? external : internal;
  return render(href, props);
};
