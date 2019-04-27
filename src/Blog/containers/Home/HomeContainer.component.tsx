import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { PostListRouteData } from '../../types/Post.model';

import { HomeTemplate as Template } from '../../templates/Home/HomeTemplate.component';

export const HomeContainer: React.StatelessComponent<{}> = () => {
  const routeData: PostListRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template {...routeData} />;
};

export default HomeContainer;
