import { dedupeTags, filterHasTag, newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';
import { Route, RouteContext } from '../Shared/types/Route.models';

import { TagNode } from './types/Tag.models';

import { resolveNodeMeta } from '../Shared/lib/meta';
import { TagTemplateRouteData } from './templates/Tag/TagTemplate.component';
import { TagsTemplateRouteData } from './templates/Tags/TagsTemplate.component';

const TOP_TAG_COUNT = 5;

const tagRoute = (context: RouteContext, tag: TagNode, nodes: Node[]): Route => {
  return newRoute<TagTemplateRouteData>(context, tag, {
    tag,
    nodes
  });
};

const tagListPageRoute = (context: RouteContext, tags: TagNode[]): Route => {
  const defaults = {
    path: 'tags',
    template: 'Taxonomy/Tags'
  };
  const page = newNode('page', 'All Tags', defaults) as PageNode;
  page.tags = dedupeTags(tags.reduce((t, media) => t.concat(media.tags), []));

  resolveNodeMeta(page, 'website', context.assetLocator, context.metaDefaults);

  const topTags = tags.slice(0, TOP_TAG_COUNT);
  const otherTags = tags.slice(TOP_TAG_COUNT);

  return newRoute<TagsTemplateRouteData>(context, page, {
    page,
    topTags,
    otherTags
  });
};

interface Data {
  tags: TagNode[];
  nodes: Node[];
}

export const buildRoutes = async (context: RouteContext, data: Data): Promise<Route[]> => {
  const tagRoutes = data.tags.map(tag => {
    const taggedNodes = data.nodes.filter(filterHasTag(tag.title));
    return tagRoute(context, tag, taggedNodes);
  });

  const pageRoute = tagListPageRoute(context, data.tags);
  const routes = [...tagRoutes, pageRoute];
  return routes;
};
