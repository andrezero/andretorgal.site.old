import { collect, flatten } from '../lib/files';
import { File } from '../lib/files';
import { Post, PostRoute } from '../types/Post.model';

const processFiles = (files: File[]): Post[] => {
  return files.map(file => {
    return {
      title: file.name,
      path: `blog/${file.path}`,
      relPath: file.path,
      content: file.contents,
      template: 'src/containers/Post/Post.container'
    };
  });
};

const loadPosts = async (): Promise<Post[]> => {
  const tree = await collect('./content/blog', true);
  const flattened = flatten(tree.children as File[]);
  return processFiles(flattened as File[]);
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
      path: '/blog',
      template: 'src/containers/Blog/Blog.container',
      getData: () => ({
        posts
      })
    },
    ...posts.map(postRoute)
  ];
};

export default getRoutes;
