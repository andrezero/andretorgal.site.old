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

> Trade-offs

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

> Trade-offs

- not written in typescript and no typings supplied for many plugins
- incomplete/inconsistent docs
- many repos, different authors

## Typed CSS Modules

> Details

- using [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader) as per this [guide](https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10)
- classes correctly typed in VSCode and compilation time
- compatible with `post-css`
- using a fork `"typings-for-css-modules-loader": "https://github.com/andrezero/typings-for-css-modules-loader",`
  - merged https://github.com/andrezero/typings-for-css-modules-loader/commit/a4971f0baa82fa129d511572aa9f027e0d55b175 - adds support for css-loader-2

> Why

- css modules because scoping out of global css for atoms, components,
- typed modules because prevents errors in compile time + faster feedback + better developer experience

> Trade-offs

- polluting filesystem with extraneous `*.scss.d.ts` (gitignored for)
- had to patch up weback config in `node.api.js`
  - solves ssg time vs client time hydration of css module classes (see backlog.md issues)
  - underlying `css-loader` is setup to always "extract css to file during node build process"
- build can become flaky
  - right now typescript complains during webpack build `TS2307: Cannot find module './Post.scss'.`
  - but both the ssg and client app seem to be working just fine (for now)
- also, `typings-for-css-modules-loader` not compatible with `css-loader@2` and requires the following in `package.json`

```
"resolutions": {
  "react-static/css-loader": "1.0.1"
}
```

> Read more

- other options considered (all based in webpack loaders)
  - https://github.com/seek-oss/css-modules-typescript-loader
  - https://github.com/olegstepura/typed-css-modules-loader
  - https://github.com/Megaputer/dts-css-modules-loader
- see [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules) for a pure typescript alternative (tested, couldn't get it to work)

## Coding Conventions: Group code by module / atomic-ish semantics

> Details

- see [coding-convetions.md](./coding-convetions.md)

> Why

- pedantic
- atomic-ish design system
- clearer module boundaries
- segregate shared components and utils from specific domains

> Trade-offs

- ugly enterprise import statements
- even uglier with all the `../../` (bloody typescript struggling with relative paths)

## A11y: shrink to fit

> Details

- not using `shrink-to-fit=no` anymore
- only `<meta name="viewport" content="width=device-width, initial-scale=1" />`

> Why

- users can pinch to zoom and/or double tap

> Read more

- [shrink-to-fit 2019](https://www.scottohara.me/blog/2018/12/11/shrink-to-fit.html)
- dropped by: the guardian, gov.uk, css tricks, reddit, google search
- still kept by: new yorker, amazon, twitter, facebook
