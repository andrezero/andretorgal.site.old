import * as React from 'react';
import { Head } from 'react-static';

import { DefaultLayout as Layout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
// import { ContentPage } from '../../../Shared/types/Page.model';

import { SiteFooter } from '../../blocks/SiteFooter/SiteFooter.component';
import { SiteHeader } from '../../blocks/SiteHeader/SiteHeader.component';

import './NotFoundTemplate.scss';

// interface Props {
//   page: ContentPage;
// }

export const NotFoundTemplate: React.StatelessComponent<{}> = () => {
  const props = {
    page: {
      type: 'page',
      title: '404 Not Found'
    }
  };
  const header = <SiteHeader page={props.page} />;
  const footer = <SiteFooter />;
  return (
    <Layout className="error-not-found" header={header} footer={footer}>
      <Head title={props.page.title} />

      <section className="container">
        <h1 className="page-title">{props.page.title}</h1>
      </section>
    </Layout>
  );
};
