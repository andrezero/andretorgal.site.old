import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { PageNode, PageRouteData } from '../../../Shared/types/Page.models';

import { AboutTemplate as Template } from '../../templates/About/AboutTemplate.component';

export const AboutContainer: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template page={routeData.page as PageNode} />;
};

export default AboutContainer;
