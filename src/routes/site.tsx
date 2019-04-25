import { ErrorPage, PageRoute } from 'types/Page.model';
import { Post } from 'types/Post.model';

const getRoutes = async (): Promise<PageRoute[]> => {
  const page: ErrorPage = {
    title: '404 - Not Found'
  };
  const posts: Post[] = [];
  return [
    {
      is404: true,
      path: '404',
      template: 'src/containers/ErrorNotFound/ErrorNotFound.container',
      getData: () => ({
        page,
        posts
      })
    }
  ];
};

export default getRoutes;
