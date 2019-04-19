# Logbook [accepted]

## Stack: [Jam Stack](https://jamstack.org/)

> Requirements

- full html static rendering
- scss
- strict typescipt, including typed scss
- markdown
- prefetching
- explicit data & code splitting
- responsive images

> Why

- blazing speed, a11y, seo
- cost: cdn vs server run time
- because 2006 was right

## Framework: React Static

> Why

- non-opinionated, pure react
- easy to use any data source
- implicit and explicit code & data splitting
- typescript entry point
- typescript compiler using tslint.json

> Tradeoffs

- almost no plugins
- very little documentation

> Read more

- [react-static-typescript-starter](https://github.com/sw-yx/react-static-typescript-starter)
- [introducing-react-static](https://medium.com/@tannerlinsley/%EF%B8%8F-introducing-react-static-a-progressive-static-site-framework-for-react-3470d2a51ebc)

## Markdown: Unified + Rehype

> Why

- modular library, many plugins
- trasnforms to react
- works in both directions
- complete [working implementation](https://github.com/s-thom/website/blob/develop/src/components/MdRenderer/index.tsx)

> Tradeoffs

- not written in typescript and no typings supplied for many plugins
- incomplete/inconsistent docs
- many repos, different authors
