import * as React from 'React';
import { resolve as urlResolve } from 'url';

import { StagingBanner } from './elements/StagingBanner/StagingBanner.component';

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
    staging?: boolean;
    siteData: any;
    renderMeta: any;
    routeInfo: any;
  };
}

export const htmlDocument = (context: Context) => {
  const { Html, Head, Body, children, state } = context;
  const { siteData, renderMeta, routeInfo, staging } = state;
  const className = (routeInfo && routeInfo.data && routeInfo.data.className) || '';
  const href = staging ? urlResolve(siteData.canonicalUrl, routeInfo.path) : '';
  return (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body className={`root-${className}`}>
        {children}

        {staging ? <StagingBanner href={href} /> : ''}
      </Body>
    </Html>
  );
};
