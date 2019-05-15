---
title: 'Changelog'
updated: '2019-05-13'
---

Tasks from [my website](/about)'s [backlog](./backlog), eventually done (or archived).

<!-- abstract -->

- [x] page style
- [x] meta style
- [x] tag style
- [x] hero component
- [x] fix sronly not being rendered
- [x] fix headings
- [x] differentiate external links

- [x] models: tags
- [x] page tags
- [x] page tag

- [x] format dates are missing month names
- [x] format checkboxes in markdown

- [x] link nodes: children/parent

  - [x] show children component in meta/
  - [x] link to parent in meta/

- [x] link nodes: next/previous

  - [x] show next/previous in posts/
  - [x] show related nodes

- [x] cleanup templates, add feed route, improve route paths

  - [x] rename meta/ to meta
  - [x] improve header style
  - [x] simplify link component, allow passing dom attributes link tabIndex
  - [x] show recent nodes under feed/ and home page
  - [x] refactor routes containers and templates
    - [x] move containers next to templates, using a simple wrapper fn
    - [x] declare route interfaces in template units as well
  - [x] show tags in posts

- [x] migrate scss

  - [x] CSS custom properties
  - [x] css global variables mixins
  - [x] move away from css modules
  - [x] site footer
  - [x] blog navigation
  - [x] fix page container

- [x] simplify scss, cleanup css (drop support for IE 11 and opera mobile)

- [x] rendering posts

  - [x] read-more element
  - [x] breakdown blog components; introduce @mixin base-page
  - [x] refactor model: everything is a node (page, doc, post, ...)
  - [x] show post dates
  - [x] extract post meta, tag list, rename article > node

- [x] convert `>` to `##` in docs

- [x] accessible routing:

  - [x] set focus on page load, route change and anchor navigation
  - [x] scroll to anchor on page load and on route change
  - [x] scroll to top on page route change
  - [x] switch from `@reach/router` to `react-router`

- [x] markdown factory, and specialised markdown elements
- [x] no default exports, except for containers and App
- [x] integrate docs into content
- [x] re-organise docs
- [x] split records into individual files
- [x] spike: storybook + typescript + scssd
- [x] cleanup: react static config, watcher, routes, extraneuos 404 page
- [x] typed scss modules (ide support + compile time)
- [x] css ie11 support via postcss and prefixer
- [x] scss lint
- [x] fix: strip links from abstracts not working
- [x] custom headings with anchor
- [x] normalise code style
- [x] abstract: extract text from a specific markdown block
- [x] typed route data
- [x] head, seo, helmet
- [x] frontmatter: custom title
- [x] custom template
- [x] custom slug
- [x] internal links should default to top anchor
- [x] layout container
- [x] watch content directories and re-render on change
- [x] external vs local links in markdown renderer
- [x] markdown POC blog posts [props](https://github.com/s-thom/website/blob/develop/src/components/MdRenderer/index.tsx)

---

- [x] Spike: React Static (+ typescript + sass)

  - [x] [bootstrap](https://medium.com/@thetrevorharmon/how-to-make-a-super-fast-static-site-with-gatsby-typescript-and-sass-3742c00d4524)
  - [x] full static build
  - [x] 404
  - [ ] typed scss modules (ide support + compile time)
  - [ ] IE11

---

- [x] Spike: Gatsby (+ typescript + sass + markdown)
  - [x] bootstrap
  - [x] full static build
  - [x] move content to `./content`
  - [x] typed scss modules (ide support + compile time)
  - [x] 404
  - [x] IE11
  - [x] env vars
  - [ ] markdown pages
  - [ ] markdown blog posts

## Abandoned

- not using `css-modules` for now
  - [ ] `react-static` ssg time vs client time hydration of css module classes breaks down
        / using [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader)
        / following [issue here](https://github.com/nozzle/react-static/issues/984)
        / see [loggbook](./logbook-accepted.md)
  - [ ] `react-static` tries to build pages for sass typings `404.scss.d.ts`
