import TemplateLocator from './Shared/lib/classes/TemplateLocator';

import loadPosts from './Blog/posts.source';
import loadPages from './Pages/pages.source';

import buildBlogRoutes from './Blog/blog.routes';
import buildPagesRoutes from './Pages/pages.routes';
import buildSiteRoutes from './Site/site.routes';

const routeBuilder = () => {
  const templates = new TemplateLocator();

  const getRoutes = async () => {
    const pages = await loadPages();
    const posts = await loadPosts();

    const siteRoutes = await buildSiteRoutes(templates);
    const pagesRoutes = await buildPagesRoutes(templates, { pages });
    const blogRoutes = await buildBlogRoutes(templates, { posts });

    return [...siteRoutes, ...pagesRoutes, ...blogRoutes];
  };

  return { getRoutes };
};

export default routeBuilder;
