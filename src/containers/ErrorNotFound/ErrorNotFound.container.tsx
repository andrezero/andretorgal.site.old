import * as React from 'react';
import { Head, useRouteData } from 'react-static';

import * as styles from './ErrorNotFound.module.scss';

import DefaultLayout from '../../layout/DefaultLayout/DefaultLayout.component';
import { ContentPage, PageRouteData } from '../../types/Page.model';

const ErrorNotFound: React.StatelessComponent<{}> = () => {
  const routeData: PageRouteData = useRouteData();
  const posts = routeData.posts;
  const page = routeData.page as ContentPage;
  return (
    <DefaultLayout className={styles.layout}>
      <Head title={page.title} />
      <h1>{page.title}</h1>
      {/* <h1 className="title-page">Latest Posts {posts.length}</h1> */}
    </DefaultLayout>
  );
};

export default ErrorNotFound;
