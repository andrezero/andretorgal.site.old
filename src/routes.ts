import { TemplateLocator } from './Shared/lib/classes/TemplateLocator';
import { Node } from './Shared/types/Node.models';
import { Route } from './Shared/types/Route.models';

import { loadPosts } from './Blog/posts.source';
import { loadMetas } from './Meta/meta.source';
import { loadPages } from './Site/pages.source';
import { generateTags, loadTags } from './Taxonomy/tags.source';

import { buildRoutes as buildBlogRoutes } from './Blog/blog.routes';
import { buildRoutes as buildFeedRoutes } from './Feed/feed.routes';
import { buildRoutes as buildMetasRoutes } from './Meta/meta.routes';
import { buildRoutes as buildPagesRoutes } from './Site/pages.routes';
import { buildRoutes as buildSiteRoutes } from './Site/site.routes';
import { buildRoutes as buildTaxonomyRoutes } from './Taxonomy/tags.routes';

export const routeBuilder = () => {
  const templates = new TemplateLocator();

  const getRoutes = async () => {
    const [pages, posts, metas, loadedTags] = await Promise.all([loadPages(), loadPosts(), loadMetas(), loadTags()]);

    const allNodes: Node[] = [...pages, ...posts, ...metas];

    const allTags = generateTags(loadedTags, [...allNodes, ...loadedTags]);
    allNodes.push(...allTags);

    return await Promise.all([
      buildSiteRoutes(templates),
      buildPagesRoutes(templates, { pages, posts }),
      buildBlogRoutes(templates, { posts }),
      buildMetasRoutes(templates, { metas }),
      buildFeedRoutes(templates, { nodes: allNodes }),
      buildTaxonomyRoutes(templates, { tags: allTags, nodes: allNodes })
    ]).then(groups => {
      return groups.reduce((all, group) => all.concat(group), [] as Route[]);
    });
  };

  return { getRoutes };
};
