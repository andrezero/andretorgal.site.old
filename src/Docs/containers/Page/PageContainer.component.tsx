import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { ContentPage, PageRouteData } from '../../../Shared/types/Page.model';

import { PageTemplate as Template } from '../../templates/Page/PageTemplate.component';

export const PageContainer: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template page={routeData.page as ContentPage} />;
};

export default PageContainer;
