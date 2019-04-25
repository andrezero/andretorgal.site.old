import dayjs from 'dayjs';

import { makeContent, parseFileContents } from '../process/content';
import { makeMeta, makePath, makeTemplate, makeTitle } from '../process/data';
import { collect, flatten } from '../process/files';
import { FileNode } from '../types/File.types';
import { ContentPage, PageRoute } from '../types/Page.model';
import { Post, PostListRouteData, PostRoute, PostRouteData } from '../types/Post.model';

const createPost = (file: FileNode): Post => {
  const { data, content, abstract } = parseFileContents(file.contents);
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
    content: makeContent(content),
    abstract: makeContent(abstract),
    template,
    created: data.created.toDate(),
    updated: data.updated.toDate(),
    tags: data.tags,
    meta
  };
};

const loadPosts = async (): Promise<Post[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children as FileNode[]);
  const sorted = flattened.sort((p1, p2) => p2.created.getTime() - p1.created.getTime());
  return sorted.map(createPost);
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

const postListPage = (): ContentPage => {
  return {
    title: 'Latest blog posts',
    path: '/posts',
    rel: '/posts',
    created: new Date(),
    updated: new Date(),
    template: 'src/containers/Blog/Blog.container',
    meta: makeMeta()
  };
};

const postListPageRoute = (posts: Post[]): PageRoute => {
  const page = postListPage();
  return {
    path: page.path,
    template: page.template,
    getData: (): PostListRouteData => ({
      posts,
      page
    })
  };
};

const getRoutes = async (): Promise<Array<PageRoute | PostRoute>> => {
  const posts = await loadPosts();
  const pageRoute = postListPageRoute(posts);
  return [pageRoute, ...posts.map(postRoute)];
};

export default getRoutes;
