import blogRoutes from './routes/blog';
import pagesRoutes from './routes/pages';
import siteRoutes from './routes/site';

const getRoutes = async () => {
  const site = await siteRoutes();
  const blog = await blogRoutes();
  const pages = await pagesRoutes();

  return [...site, ...pages, ...blog];
};

export default getRoutes;
