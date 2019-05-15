import { TemplateLocator } from '../Shared/lib/classes/TemplateLocator';
import { filterHasTag, newNode } from '../Shared/lib/nodes';
import { newRoute } from '../Shared/lib/routes';
import { Node } from '../Shared/types/Node.models';
import { PageNode } from '../Shared/types/Page.models';
import { Route } from '../Shared/types/Route.models';

import { TagNode } from './types/Tag.models';

import { TagTemplateRouteData } from './templates/Tag/TagTemplate.component';
import { TagsTemplateRouteData } from './templates/Tags/TagsTemplate.component';

const TOP_TAG_COUNT = 5;

const tagRoute = (templates: TemplateLocator, tag: TagNode, nodes: Node[]): Route => {
  return newRoute<TagTemplateRouteData>(templates, tag, {
    tag,
    nodes
  });
};

const tagListPageRoute = (templates: TemplateLocator, tags: TagNode[]): Route => {
  const defaults = {
    path: 'tags',
    template: 'Taxonomy/Tags'
  };
  const page = newNode('page', 'All Tags', defaults) as PageNode;

  const topTags = tags.slice(0, TOP_TAG_COUNT);
  const otherTags = tags.slice(TOP_TAG_COUNT);

  return newRoute<TagsTemplateRouteData>(templates, page, {
    page,
    topTags,
    otherTags
  });
};

interface Data {
  tags: TagNode[];
  nodes: Node[];
}

export const buildRoutes = async (templates: TemplateLocator, data: Data): Promise<Route[]> => {
  const tagRoutes = data.tags.map(tag => {
    const taggedNodes = data.nodes.filter(filterHasTag(tag.title));
    return tagRoute(templates, tag, taggedNodes);
  });

  const pageRoute = tagListPageRoute(templates, data.tags);
  const routes = [...tagRoutes, pageRoute];
  return routes;
};
