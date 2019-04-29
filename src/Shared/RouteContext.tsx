import * as React from 'react';
import { RouteData } from './types/Route.model';

export const RouteContext = React.createContext({});

export const withRouteData = (children: React.ReactElement, routeData: RouteData): React.ReactElement => {
  return <RouteContext.Provider value={routeData}>{children}</RouteContext.Provider>;
};
