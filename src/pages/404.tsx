import * as React from 'react';
import { Head } from 'react-static';

import './404.css';

import DefaultLayout from '../layout/DefaultLayout/DefaultLayout.component';

const NotFoundPage: React.StatelessComponent<{}> = () => {
  return (
    <DefaultLayout>
      <Head title="Not found" />
      <h1>404 Not Found</h1>
    </DefaultLayout>
  );
};

export default NotFoundPage;
