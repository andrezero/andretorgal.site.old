import * as React from 'react';
import { useRouteData } from 'react-static';

import { bodyClassSwitch } from '../../../Shared/lib/dom';
import { PostRouteData } from '../../types/Post.model';

import { PostTemplate as Template } from '../../templates/Post/PostTemplate.component';

export const PostContainer: React.StatelessComponent<{}> = () => {
  const routeData: PostRouteData = useRouteData();
  React.useEffect(() => {
    const className = routeData.className;
    bodyClassSwitch('root', className);
  });
  return <Template {...routeData} />;
};
