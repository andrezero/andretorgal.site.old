---
title: 'Framework: Gatsby + Typescript + CSS Modules + SCSS'
---

> Why

- static site, html burner
- react + typescript (tsx) sass
- plugin galore (images, attachments, meta, seo, ...)

> Tradeoffs

- all data sources need a graphql layer
- data models in components, boilerplate
- not pure typescript (many js config files)
- typescript not compiled strict (not using tsconfig.json?) at develop/build time
- brittle, multiple compilation issues so far

> Issues

- typed css modules painful
- integration with storyook painful
- typed graphql queries
  - https://www.isaacbroyles.com/2018/08/19/gatsbyjs-typescript.html

> Read more

- [guide: gatsby+typescript+sass step by step](https://medium.com/@thetrevorharmon/how-to-make-a-super-fast-static-site-with-gatsby-typescript-and-sass-3742c00d4524)
- [starter: blog](https://github.com/mhadaily/gatsby-starter-typescript-power-blog)
- [example: blog](https://github.com/magarcia/magarcia.io/tree/greenkeeper/gatsby-2.3.2)
