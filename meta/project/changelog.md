---
title: 'Changelog'
updated: '2019-05-13'
tags: ['andretorgal-com']
---

Tasks from [my website](/about)'s [backlog](/meta/project/backlog), eventually done (or archived).

<!-- abstract -->

<!-- spellcheck-off -->

- [x] fix media create/update dates and media list sorted by
- [x] fix image card link withing link, image detail double title

- [x] migrate tslint to eslint
- [x] seo
  - [x] redirect www.andretorgal.com to andretorgal.com (Route53 > CF > S3 redirect)
  - [x] google search sitemap submit / [domain verification](https://support.google.com/a/answer/6149686?hl=en&ref_topic=4487770)

- [x] feedback and hotfixes
  - [x] fix! a couple of 404 in `feed/`
  - [x] fix nested `<a>` in `tags/` page, improve tag list style
  - [x] fix blog post abstract style missing
  - [x] fix markdown is rendering an extra div (definitely messing with first/last-child margin resets)
  - [x] fix missing dropcaps style
  - [x] fix media list item in feed not rendering image
  - [x] mute recently updated
  - [x] fix empty tag list rendering empty `<ul>` is annoying for screen reading
  - [x] fix noselect missing in some navigation and meta
  - [x] fix meta list item is not picking up the right component
  - [x] exclude `home/`, `media/`, `feed/`, and `tags/` from feed, as they pick up tags from the listed items
  - [x] fix empty/repeated meta tags: refactor node meta tag objects to dicts, convert to array just before rendering
  - [x] fix tag page, tag count truncated
  - [x] fix layout, section v spacing
  - [x] fix feed path filter was duh
  - [x] enhance link to top with javascript scroll to top, prevents bottom & top of page from both being entries in browser history
  - [x] add banner to staging
  - [x] add banner to drafts
  - [x] check [sitemap](https://support.google.com/webmasters/answer/156184)
  - [x] style suspense fallback loading component
  - [x] fix staging, link to prod was broken
  - [x] fix media pages not showing sources
  - [x] `ResponsiveImg` handle image [loaded](https://www.javascriptstuff.com/detect-image-load/) transition
  - [x] `ResponsiveImg` load on scroll into view
  - [x] replace utf chars with svg (external link and link to top)
  - [x] refactor details and cards; introducing node type mixins
  - [x] refactor schemes
  - [x] `/meta` `validateDOMNesting(...): <p> cannot appear as a descendant of <p>.`

- [x] deploy to prod

  - [x] setup staging buckets, cloudfront, cname
  - [x] s3 sync in dev time
  - [x] add a `!-- notes --` section to articles (stripped out in prod)
  - [x] production build: strip notes & filter drafts
  - [x] recreate separate buckets and distributions for staging/prod
  - [x] render different custom metas depending on stage (e.g. robots)
  - [x] add custom `robots.txt` to `dist/` folder depending on build stage
  - [x] local deploy scripts
  - [x] bounce andretorgal.com
  - [x] create R53 > CF > S3 > redirection `www.andretorgal.com` to `andretorgal.com`
  - [x] enable [gzip in Cloudfront?]([https://medium.com/faun/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128])

- [x] assets: extract, manipulate, responsive print images and upload

  - [x] collect assets and generate asset nodes
    - [x] refactor: move links to node.meta
    - [x] refactor: DRY node/route creation
    - [x] refactor: move link functions from `lib/node.ts` to `lib/link.ts`
  - [x] create media nodes and routes
  - [x] define asset preset/profiles
  - [x] locate and copy during dev build
  - [x] collect assets from hero too
  - [x] og image
    - [x] complete meta headers
    - [x] replace `ReactStatic.Head` with custom `<Head page={node} title={...} meta={[...]}>`
    - [x] meta description defaults;
  - [x] generate resolutions during dev build
    - [x] managing images, image sharp, other
    - [x] refactor markdown, kill variants
  - [x] responsive print
  - [x] serve locally via `npm server` using `concurrently`

- [x] improve tooling

  - [x] update dependencies
  - [x] configure lintstyle, eslint, tslint

- [x] models, views

  - [x] page style
  - [x] meta style
  - [x] tag style
  - [x] hero component
  - [x] fix sronly not being rendered
  - [x] fix headings
  - [x] differentiate external links
  - [x] contents/meta abstracts (include in page body)
  - [x] contents/page abstracts (include in hero if hero is on)

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

- [x] simplify scss

  - [x] reconfigure browserslist
  - [x] drop support for IE 11 and opera mobile)
  - [x] cleanup css

- [x] rendering posts

  - [x] read-more element
  - [x] breakdown blog components; introduce @mixin base-page
  - [x] refactor model: everything is a node (page, doc, post, ...)
  - [x] show post dates
  - [x] extract post meta, tag list, rename article > node

- [x] accessible routing:

  - [x] set focus on page load, route change and anchor navigation
  - [x] scroll to anchor on page load and on route change
  - [x] scroll to top on page route change
  - [x] switch from `@reach/router` to `react-router`

- [x] collect nodes and render

  - [x] markdown factory, and specialised markdown elements
  - [x] no default exports, except for containers and App
  - [x] integrate docs into content
  - [x] re-organise docs
  - [x] split records into individual files
  - [x] spike: storybook + typescript + scssd
  - [x] cleanup: react static config, watcher, routes, extraneous 404 page
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
        / see [logbook](/meta/records/logbook-accepted.md)
  - [ ] `react-static` tries to build pages for sass typings `404.scss.d.ts`
