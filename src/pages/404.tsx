import * as React from 'react';
import { Head } from 'react-static';

import * as styles from './404.scss';

import DefaultLayout from '../layout/DefaultLayout/DefaultLayout.component';

const NotFoundPage: React.StatelessComponent<{}> = () => {
  return (
    <DefaultLayout>
      <Head title="Not found" />
      <h1>
        <span className={styles.wtf}>404</span> Not Found
      </h1>
      <p className="foo">CSS red, SASS pink</p>
    </DefaultLayout>
  );
};

export default NotFoundPage;
