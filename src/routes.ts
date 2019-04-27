import TemplateLocator from './Shared/lib/classes/TemplateLocator';

import loadPosts from './Blog/posts.source';
import loadDocs from './Docs/docs.source';
import loadPages from './Pages/pages.source';

import buildBlogRoutes from './Blog/blog.routes';
import buildDocsRoutes from './Docs/docs.routes';
import buildPagesRoutes from './Pages/pages.routes';
import buildSiteRoutes from './Site/site.routes';

const routeBuilder = () => {
  const templates = new TemplateLocator();

  const getRoutes = async () => {
    const pages = await loadPages();
    const posts = await loadPosts();
    const docs = await loadDocs();

    const siteRoutes = await buildSiteRoutes(templates);
    const pagesRoutes = await buildPagesRoutes(templates, { pages });
    const blogRoutes = await buildBlogRoutes(templates, { posts });
    const docsRoutes = await buildDocsRoutes(templates, { docs });

    return [...siteRoutes, ...pagesRoutes, ...blogRoutes, ...docsRoutes];
  };

  return { getRoutes };
};

export default routeBuilder;
