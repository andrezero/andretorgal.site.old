import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';

import { NotFoundTemplate as Template } from '../../templates/ErrorNotFound/NotFoundTemplate.component';

const NotFoundContainer: React.StatelessComponent<{}> = () => {
  React.useEffect(() => {
    bodyClassSwitch('root', 'error');
  });
  return <Template /*page={routeData.page as ContentPage}*/ />;
};

export default NotFoundContainer;
