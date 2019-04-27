---
title: 'Project structure'
---

- code grouped by module
- using atomic-ish semantics (but translated back to html speak)

## Modules

- `Shared/`
  - abstract models like `Route` and `Page`
  - shared `lib/` such as `meta`, `files`, ...
  - abstract atoms, layouts
- `Site`
  - containers and templates for homepage, error pages
  - site sections
  - `site.routes.ts`
- `Taxonomy`
  - containers and templates for tag list, tag detail, ...
  - tag components
  - Tag type
  - `taxonmy.sources.ts`
  - `taxonmy.routes.ts`
- `Blog`
  - containers and templates for blog home, posts, archives, ...
  - post components
  - Post type
  - `blog.sources.ts`
  - `blog.routes.ts`
- ...

## File name conventions

- strict `src/<Module>/<kind>/Unit/Unit<.extensions(s)>`
- where `<Module>` is CamelCase (e.g.: `Site`)
- and `<kind>` is kebak-case, pluralised

```
src/Blog/components/TagLink/TagLink.component.tsx
```

- component extensions:
  - `Link.component.tsx` - react component
  - `Link.module.scss` - css module
  - `Link.global.scss` - global css (theming/variables)
  - `Link.stories.txs` - styleguide
  - `Link.stories.scss` - supports styleguide if needed

## Components

### Using React

- prefer stateless

```tsx
const HomeContainer: React.StatelessComponent<{}> = () => {};
```

- use hooks
- name component units with extension `.component.tsx`
- unless the unit exports a component factory function

```tsx
// injected element type
export const anchoredHeading = (tag: React.ElementType): React.StatelessComponent<Props> => {
  // ... return React.StatelessComponent<Props>
};
```

### Typescript

- always use named exports, never export symbols as default
- always export named `const` or `class`

```tsx
export class PostTemplate...
```

- except for `containers/`, export them as default, required by`react-static`

```tsx
const HomeContainer: React.StatelessComponent<{}> = () => {};
export default HomeContainer;
```

- import aliased if needed

```tsx
import { ErrorLayout as Layout } from '../layouts/ErrorLayout.component';
```

### Atomic-ish semantics (translated to back to HTML)

Translate atomic design back from chemistry into HTML sematics.

Building blocks:

- `elements/` - think atoms, but even better: think html

  - e.g.: `Shared/elements/Link.component.tsx`
  - e.g.: `Blog/elements/BlogDate.component.tsx`

- `blocks/` - think molecules

  - typically `<header>`, `<footer>`, `<div>`, `<ul>`
  - e.g.: `Shared/blocks/CardHeader.component.tsx`
  - e.g.: `Blog/blocks/PostTags.component.tsx`

- `items/` - think organisms

  - compose blocks and elements
  - prefer `<article>`
  - e.g.: `Shared/items/Card.component.tsx`
  - e.g.: `Blog/items/PostCard.component.tsx`

- `sections/` - think macro organisms

  - compose items, blocks and elements
  - typically `<section>`
  - abstract local layouts (composing blocks and items via children)
  - e.g.: `Shared/sections/CardGrid.component.tsx`
  - or views, coupled with a model
  - e.g.: `Blog/sections/PostList.component.tsx`
  - or template level sections
  - e.g.: `Site/sections/SiteHeader.component.tsx`

- `templates`

  - compose the layout using:
    - `<SomeLayout>`
    - site sections
    - `<main>`
    - the page sections
    - some other items and blocks
  - always name as `SomeTemplate`
  - e.g.: `BlogTemplate.component.tsx` exports `BlogTemplate`

- `layouts/`

  - global layouts only
  - note: local abstract layouts are in `Shared/sections/...`
  - always name as `SomeLayout`
  - e.g.: `Blog/layouts/PostLayout.component.tsx` exports `PostLayout`

- `containers`

  - always name as `SomeContainer`
  - e.g.: `Blog/container/PostContainer.component.tsx` exports `PostContainer`

- `behaviours/`

  - no html rendered, or semantics irrelevant
  - e.g.: `AutoScrollTop.behaviour.tsx`

- others:

  - `lib/` - functions mostly
  - `styles/` - global css and mixins
  - `types/` - models, types, interfaces
