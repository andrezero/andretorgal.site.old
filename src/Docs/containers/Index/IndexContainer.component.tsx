import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { ContentPage, PageRouteData } from '../../../Shared/types/Page.model';

import { IndexTemplate as Template } from '../../templates/Index/IndexTemplate.component';

export const IndexContainer: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template page={routeData.page as ContentPage} />;
};

export default IndexContainer;