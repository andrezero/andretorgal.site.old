---
title: 'Browser Support: progressive'
---

## Details:

- start with good code, web-standards
- add polyfills and fallbacks if

- previously:

```json
// package.json > browserslist
["cover 95%", "not dead"]
```

- now

```json
// package.json > browserslist
["last 2 years", "> 1%", "not ie 11", "not ie_mob 11", "not op_mini all"]
```

- which results in
  - and_chr > 73
  - and_ff > 66
  - and_uc > 11.8
  - android > 67
  - chrome > 59
  - edge > 16
  - firefox > 54
  - ios_saf > 11.0-11.2
  - kaios > 2.5
  - opera > 45
  - safari > 11
  - samsung > 6.2-6.4

## Why

- not explicitly supporting any browser that forces me to

  - pollute my css with fallbacks
  - contort my scss
  - harm my developer experience

## Tradeoffs

- coverage down to 89%
- very minimal CSS available for IE 11 and Opera Mini
  - CSS is using custom properties very liberally
  - current technique requires that fallback is always provided to the rule
  - not up for that

## Read more

- [browserslist](https://github.com/browserslist/browserslist)
- [postcss-preset-env](https://github.com/csstools/postcss-preset-env)
