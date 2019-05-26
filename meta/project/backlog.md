---
title: 'Backlog'
updated: '2019-05-13'
tags: ['andretorgal-com']
---

Stuff I want to do/experiment on [my website](/meta).

The done stuff is on the [changelog](/meta/project/changelog) page.

<!-- abstract -->

<!-- spellcheck-off -->

## Now

- [ ] feedback and hotfixes

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
  - [ ] add banners to drafts and staging
  - [ ] check [sitemap](https://support.google.com/webmasters/answer/156184)
  - [ ] fix style suspense fallback loading component
  - [ ] fix media pages not showing sources
  - [ ] `ResponsiveImg` handle image [loaded](https://www.javascriptstuff.com/detect-image-load/) transition
  - [ ] `ResponsiveImg` load on scroll into view
  - [ ] replace link to top with javascript scroll to top, otherwise bottom of page stays as an entry in history

## Next

- [ ] continuous deployment with [gitlab](https://hackernoon.com/using-gitlab-ci-cd-to-auto-deploy-your-vue-js-application-to-aws-s3-9affe1eb3457)

  - [ ] purge assets not in use before sync

- [ ] poc: header colour switch (re-check class switching)
- [ ] poc: minimalistic header

- [ ] blog roll
- [ ] add crono to changelog and to my story

- [ ] internal navigation

  - [ ] feed page
    - [ ] recently updated, just the titles;
    - [ ] top tags + see all tags
  - [ ] tag page: related tags + see all tags
  - [ ] about
    - [ ] navigation
  - [ ] home
    - [ ] only a single (latest) blog post + see more
    - [ ] top tags + see all tags
    - [ ] about module
  - [ ] posts page
    - [ ] top tags + see all tags
    - [ ] about module
  - [ ] post page
    - [ ] navigation (next, previous)
    - [ ] related posts
    - [ ] see all posts
  - [ ] media page
    - [ ] navigation (next, previous)
    - [ ] see all media
  - [ ] meta page
    - [ ] navigation (breadcrumbs)

- [ ] fix create/update dates (assets are getting the latest date)
- [ ] node type should also be a tag
- [ ] ui: responsively reposition dates along with node type, as well as meta and tags

- [ ] a11y tooling: linting with [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) and run time analysis with [react-axe](https://github.com/dequelabs/react-axe)

- [ ] footnotes

- [ ] router [transition](https://reach.tech/router/example/animation)

- [ ] contents/tag/personal.md
- [x] contents/meta abstracts (include in page body)
- [x] contents/page abstracts (include in hero if hero is on)
- [ ] migrate experiments

- [ ] emojis in timeline
- [ ] use icons in footer external links
- [ ] noise in the transition to the footer

- [ ] add links to the source files on github

- [ ] storybook: type, scheme, space [see typography here](https://medium.com/eightshapes-llc/
      typography-in-design-systems-6ed771432f1e) and [space here](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62), and [some inspiration](https://zeit.co/design) too
- [ ] jest + enzyme
- [ ] husky + lint staged

## Later

- [ ] search
- [ ] make data available to the 404 page
  - [ ] fix/workaround issue of `getRouteData()` being useless here
  - [ ] refactor routes code, decouple routes from sources so that data from one source can be used in different routers

## Issues

- [ ] `react-dom.development.js:522 Warning: Encountered two children with the same key, /tags/social-web` in `/tags`

### a11y

- [ ] acessible routing: scroll to top when clicking on link to current page (and no anchor in link)

### React Static

- [ ] `7.0.10` errors when builing for production: `Error: React-Hot-Loader: Hot Module Replacement is not enabled`
- [ ] `7.0.9` noise when building for production
- [ ] `7.0.9` error with webpack-dev-server - `Uncaught SyntaxError: The URL 'http:/[http//localhost]:3000' is invalid` - patched with `"resolutions": { "react-static/webpack-dev-server": "3.2.1" }` in `package.json`
- [ ] maximum call stack error when using helmet with children, following [issue here](https://github.com/nozzle/react-static/issues/1119)
- [ ] 404 has no access to `getRouteData()` because it looks up the failed route instead of the `404` path

### Typescript

- [ ] Types for `rehype-raw` `rehype-react` `remark-parse` and `remark-rehype` added manually, waiting for [this PR](https://github.com/remarkjs/remark/pull/383) to be merged, posted on [unified community](https://spectrum.chat/unified/type-definitions/missing-typings-across-plugin-community~49ee93c0-23bf-49f3-9706-2468b0760564)

### Puzzles

- [ ] `react-static` [docs](https://github.com/nozzle/react-static/blob/master/meta/api.md#reloadClientData) mentions `reloadCliendData()` should be used to re-render when data changes, but I only got it to work by using the undocumented api `rebuildRoutes()`
- [ ] `@reach/router` [anchor link support](https://github.com/reach/router/issues/235) and how to tame [focus and scroll on long content](https://github.com/reach/router/issues/62)
- [ ] [Lighthouse](https://developers.google.com/web/tools/lighthouse/) seems to report time to first interaction thinking that the page is waiting for react to render (when in fact is just hydrating)

### Spikes

- [ ] [mdx](https://mdxjs.com/advanced/typescript) how to have side by side (or plugged to) the unified, remark, rehype pipeline

- [ ] [solid](https://solid.inrupt.com/)

  - [ ] [linked-data-developer-experience](https://ruben.verborgh.org/blog/2018/12/28/designing-a-linked-data-developer-experience/)

- [ ] svg trickery
  - [ ] via [postcss](https://github.com/jonathantneal/postcss-write-svg)

### Learn/Experiment

- [ ] Ayy1: [On demand annoucements](https://github.com/Heydon/on-demand-live-region)
- [ ] Microformats
- [ ] [Micropub](https://indieweb.org/Micropub) + [micropub-express](https://github.com/voxpelli/node-micropub-express) + [Micropub](https://micropub.rocks/)
- [ ] [Webmentions](https://webmention.io/)
- [ ] React Portals - a first-class way to render children into a dom node
      that exists outside the dom hierarchy of the parent component.
- [ ] React ErrorBoundary
- [ ] [Image optimisation with HOC](https://medium.com/grailed-engineering/image-optimization-using-higher-order-components-f401e6b4e1b1)
