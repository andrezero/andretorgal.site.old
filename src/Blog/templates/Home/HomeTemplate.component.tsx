import * as React from 'react';
import { Head } from 'react-static';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { Markdown } from '../../../Shared/elements/Markdown/Markdown.component';
import { DefaultLayout } from '../../../Shared/layout/DefaultLayout/DefaultLayout.component';
import { ContentPage } from '../../../Shared/types/Page.model';

import { Post } from '../../types/Post.model';

interface Props {
  page: ContentPage;
  posts: Post[];
}

export const HomeTemplate: React.StatelessComponent<Props> = props => {
  return (
    <DefaultLayout>
      <Head title="Recent posts" meta={props.page.meta} />
      <h1 className="title-page" aria-label={props.page.title}>
        Latest Posts
      </h1>
      <ul className="article-list">
        {props.posts.map((post: Post) => (
          <li key={post.path}>
            <Link to={post.path}>{post.title}</Link>
            <Markdown text={post.abstract.source} stripped={true} />
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};
