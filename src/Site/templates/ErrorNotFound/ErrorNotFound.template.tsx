import * as React from 'react';
import { Head } from 'react-static';

import DefaultLayout from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import * as styles from './ErrorNotFound.module.scss';

// interface Props {
//   page: ContentPage;
// }

const Template: React.StatelessComponent<{}> = () => {
  const props = {
    page: {
      title: '404 Not Found'
    }
  };
  return (
    <DefaultLayout className={styles.layout}>
      <Head title={props.page.title} />
      <h1>{props.page.title}</h1>
      {/* <h1 className="title-page">Latest Posts {posts.length}</h1> */}
    </DefaultLayout>
  );
};

export default Template;
