import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';

import Template from '../../templates/ErrorNotFound/ErrorNotFound.template';

const Container: React.StatelessComponent<{}> = () => {
  React.useEffect(() => {
    bodyClassSwitch('root', 'error');
  });
  return <Template /*page={routeData.page as ContentPage}*/ />;
};

export default Container;
