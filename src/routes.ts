import blogRoutes from './routes/blog';
import pagesRoutes from './routes/pages';

const getRoutes = async () => {
  const blog = await blogRoutes();
  const pages = await pagesRoutes();

  return [...pages, ...blog];
};

export default getRoutes;
