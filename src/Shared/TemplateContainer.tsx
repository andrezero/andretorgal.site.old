import * as React from 'react';
import { RouteData } from './types/Route.models';

import { useRouteData } from 'react-static';
import { bodyClassSwitch } from './lib/dom';

export function templateContainer<T extends RouteData>(
  Template: React.StatelessComponent
): React.StatelessComponent<{}> {
  const TemplateContainer = () => {
    const routeData: T = useRouteData();
    React.useEffect(() => {
      const className = routeData.className;
      bodyClassSwitch('root', className);
    });
    return <Template {...routeData} />;
  };

  return TemplateContainer;
}
