import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { PostRouteData } from '../../types/Post.model';

import Template from '../../templates/Post/Post.template';

const Container: React.StatelessComponent<{}> = () => {
  const routeData: PostRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template {...routeData} />;
};

export default Container;
