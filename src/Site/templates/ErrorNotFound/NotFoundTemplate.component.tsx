import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
// import { ContentPage } from '../../../Shared/types/Page.model';

import * as styles from './NotFoundTemplate.module.scss';

// interface Props {
//   page: ContentPage;
// }

export const NotFoundTemplate: React.StatelessComponent<{}> = () => {
  const props = {
    page: {
      title: '404 Not Found'
    }
  };
  return (
    <Layout className={styles.layout}>
      <Head title={props.page.title} />
      <h1>{props.page.title}</h1>
      {/* <h1 className="title-page">Latest Posts {posts.length}</h1> */}
    </Layout>
  );
};
