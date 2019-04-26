import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { ContentPage, PageRouteData } from '../../../Shared/types/Page.model';

import Template from '../../templates/About/About.template';

const Container: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template page={routeData.page as ContentPage} />;
};

export default Container;
