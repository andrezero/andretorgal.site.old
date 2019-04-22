import dayjs from 'dayjs';
import matter from 'gray-matter';

import { makePath, makeTemplate, makeTitle } from '../lib/file-data';
import { collect, File, flatten } from '../lib/files';
import { Post, PostRoute } from '../types/Post.model';

const processFiles = (files: File[]): Post[] => {
  return files.map(file => {
    const { data, content } = matter(file.contents);
    const title = makeTitle(data, file.name);
    const created = dayjs(file.created);
    const updated = dayjs(file.created);
    const date = created.format('YYYY-MMM').toLowerCase();
    const { path, rel } = makePath(['posts', date], data.path, title);
    const template = makeTemplate(data, 'Post');
    return {
      title,
      rel,
      path,
      content,
      template,
      created: created.toDate(),
      updated: updated.toDate(),
      tags: data.tags
    };
  });
};

const loadPosts = async (): Promise<Post[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children as File[]);
  const sorted = flattened.sort((p1, p2) => p2.created.getTime() - p1.created.getTime());
  return processFiles(sorted as File[]);
};

const postRoute = (post: Post): PostRoute => {
  return {
    path: post.path,
    template: post.template,
    getData: () => ({
      post
    })
  };
};

const getRoutes = async () => {
  const posts = await loadPosts();
  return [
    {
      path: '/posts',
      template: 'src/containers/Blog/Blog.container',
      getData: () => ({
        posts
      })
    },
    ...posts.map(postRoute)
  ];
};

export default getRoutes;
