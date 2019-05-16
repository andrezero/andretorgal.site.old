---
title: 'Backlog'
updated: '2019-05-13'
---

Stuff to do on [my website](/about).

The done stuff is on the [changelog](./changelog) page.

<!-- abstract -->

## Now

- [x] update dependencies
- [x] configure lintstyle, eslint, tslint

- [ ] images: extract, manipulate, responsive print and upload

  - [x] collect assets and generate asset nodes
    - [x] refactor: move links to node.meta
    - [x] refactor: DRY node/route creation
    - [x] refactor: move link functions from `lib/node.ts` to `lib/link.ts`
  - [ ] create asset template
  - [ ] define asset profile
  - [ ] og image
  - [ ] generate resolutions during dev build
    - [ ] managing images, image sharp, other [image optimizations](https://medium.com/grailed-engineering/image-optimization-using-higher-order-components-f401e6b4e1b1)
  - [ ] responsive print
  - [ ] webpack dev-server
  - [ ] s3 sync in dev time

## Next

- [ ] minimalistic header
- [ ] about navigation
- [ ] blog navigation
- [ ] meta navigation breadcrumbs

- [ ] a11y tooling: linting with [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) and run time analysis with [react-axe](https://github.com/dequelabs/react-axe)
- [ ] fix markdown is rendering an extra div (messing first/last-child margin resets and dropcaps style)
- [ ] fix crate/update dates
- [ ] node type should also be a tag

- [ ] contents/tag/personal.md
- [ ] contents/meta abstracts (include in page body)
- [x] contents/page abstracts (include in hero if hero is on)

- [ ] years in timelines
- [ ] emojis in timeline
- [ ] use icons in footer external links
- [ ] noise in the transition to the footer

- [ ] add links to the source files on github
- [ ] add a `<!-- notes -->` section to articles that gets discarded

- [ ] storybook: type, scheme, space [see here](https://medium.com/eightshapes-llc/
      typography-in-design-systems-6ed771432f1e) and [here](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)

- [ ] about page contact section custom focus higlight

- [ ] migrate experiments
- [ ] env variables in markdown
- [ ] suspense fallback loading
- [ ] router [transition](https://reach.tech/router/example/animation)
- [ ] jest + enzyme
- [ ] husky + lint staged
- [ ] spike: gitlab + pages
- [ ] spike: gitlab + s3

## Later

- [ ] meta description defaults;
- [ ] search
- [ ] make data available to the 404 page
  - [ ] fix/workaround issue of `getRouteData()` being useless here
  - [ ] refactor routes code, decouple routes from sources so that data from one source can be used in different routers

## Issues

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

### Spikes

- [ ] [mdx](https://mdxjs.com/advanced/typescript) how to have side by side (or plugged to) the unified, remark, rehype pipeline

- [ ] [solid](https://solid.inrupt.com/)

  - [ ] [linked-data-developer-experience](https://ruben.verborgh.org/blog/2018/12/28/designing-a-linked-data-developer-experience/)

- [ ] svg trickery
  - [ ] via [postcss](https://github.com/jonathantneal/postcss-write-svg)

### Learn/Experiment

- [ ] [Micropub](https://indieweb.org/Micropub) + [micropub-express](https://github.com/voxpelli/node-micropub-express) + [Micropub](https://micropub.rocks/)
- [ ] [Webmentions](https://webmention.io/)
- [ ] React Portals - a first-class way to render children into a dom node
      that exists outside the dom hierarchy of the parent component.
- [ ] React ErrorBoundary
- [ ] [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
