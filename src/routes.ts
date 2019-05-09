import { TemplateLocator } from './Shared/lib/classes/TemplateLocator';

import { loadPosts } from './Blog/posts.source';
import { loadMetas } from './Meta/meta.source';
import { loadPages } from './Site/pages.source';

import { buildRoutes as buildBlogRoutes } from './Blog/blog.routes';
import { buildRoutes as buildMetasRoutes } from './Meta/meta.routes';
import { buildRoutes as buildPagesRoutes } from './Site/pages.routes';
import { buildRoutes as buildSiteRoutes } from './Site/site.routes';

export const routeBuilder = () => {
  const templates = new TemplateLocator();

  const getRoutes = async () => {
    const pages = await loadPages();
    const posts = await loadPosts();
    const metas = await loadMetas();

    const siteRoutes = await buildSiteRoutes(templates);
    const pagesRoutes = await buildPagesRoutes(templates, { pages });
    const blogRoutes = await buildBlogRoutes(templates, { posts });
    const metasRoutes = await buildMetasRoutes(templates, { metas });

    return [...siteRoutes, ...pagesRoutes, ...blogRoutes, ...metasRoutes];
  };

  return { getRoutes };
};
