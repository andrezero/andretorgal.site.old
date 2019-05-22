import * as React from 'React';

type AnyReactComponent = React.ComponentType<Record<string, any>>;

interface Props {
  children: React.ReactNode;
  lang: string;
}

interface Context {
  Html: AnyReactComponent;
  Head: AnyReactComponent;
  Body: AnyReactComponent;
  children: React.ReactNode;
  state: {
    siteData: any;
    renderMeta: any;
    routeInfo: any;
  };
}

export const htmlDocument = (context: Context) => {
  const { Html, Head, Body, children, state } = context;
  const { siteData, renderMeta, routeInfo } = state;
  const className = (routeInfo && routeInfo.data && routeInfo.data.className) || '';
  return (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="application-name" content="andretorgal.com" />
        <meta name="generator" content="react-static" />
        <meta name="copyright" content="Copyright 2019 André Torgal" />
        <meta name="twitter:site" content="@andrezero" />
      </Head>
      <Body className={`root-${className}`}>{children}</Body>
    </Html>
  );
};
