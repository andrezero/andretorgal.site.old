import { TemplateLocator } from './Shared/lib/classes/TemplateLocator';

import { loadPosts } from './Blog/posts.source';
import { loadDocs } from './Docs/docs.source';
import { loadPages } from './Pages/pages.source';

import { buildRoutes as buildBlogRoutes } from './Blog/blog.routes';
import { buildRoutes as buildDocsRoutes } from './Docs/docs.routes';
import { buildRoutes as buildPagesRoutes } from './Pages/pages.routes';
import { buildRoutes as buildSiteRoutes } from './Site/site.routes';

export const routeBuilder = () => {
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
