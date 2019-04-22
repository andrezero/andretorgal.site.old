import dayjs from 'dayjs';
import matter from 'gray-matter';

import { Page } from 'types/Page.model';
import { makeMeta, makePath, makeTemplate, makeTitle } from '../lib/file-data';
import { collect, File, flatten } from '../lib/files';
import { Post, PostListRouteData, PostRoute, PostRouteData } from '../types/Post.model';

const processFile = (file: File): Post => {
  const { data, content } = matter(file.contents);
  data.title = makeTitle(data.title, file.name);
  data.created = dayjs(file.created);
  data.updated = dayjs(file.created);
  const date = data.created.format('YYYY-MMM').toLowerCase();
  const { path, rel } = makePath(['posts', date], data.path, data.title);
  const template = makeTemplate(data, 'Post');
  const meta = makeMeta(data);

  return {
    title: data.title,
    rel,
    path,
    content,
    template,
    created: data.created.toDate(),
    updated: data.updated.toDate(),
    tags: data.tags,
    meta
  };
};

const loadPosts = async (): Promise<Post[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children as File[]);
  const sorted = flattened.sort((p1, p2) => p2.created.getTime() - p1.created.getTime());
  return sorted.map(processFile);
};

const postRoute = (post: Post): PostRoute => {
  return {
    path: post.path,
    template: post.template,
    getData: (): PostRouteData => ({
      post
    })
  };
};

const getRoutes = async () => {
  const posts = await loadPosts();
  const page: Page = {
    title: 'Latest blog posts',
    path: '/posts',
    rel: '/posts',
    created: new Date(),
    updated: new Date(),
    template: 'src/containers/Blog/Blog.container',
    meta: makeMeta()
  };
  return [
    {
      path: page.path,
      template: page.template,
      getData: (): PostListRouteData => ({
        posts,
        page
      })
    },
    ...posts.map(postRoute)
  ];
};

export default getRoutes;
