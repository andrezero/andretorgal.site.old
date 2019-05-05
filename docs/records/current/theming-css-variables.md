---
title: 'Theming: css variables, globals & locals'
---

## Details

- values are declared in `$settings`
- custom properties are declared in `:root {}` in global css `base`
- custom properties are used in global css, also in `base`
- custom properties are used in local css, in components

## Why?

- explore uses cases of run-time themeing
  - user settings, local storage (will it FOUC?)
  - styling with overrides, locally in components

## Trade-offs

- super involved, some scss cruft
- it's a progressive enhancement, not fully polyfilled at the moment, but fallbacks are always provided

## Read More

- [theming with variables](https://css-tricks.com/theming-with-variables-globals-and-locals/)
- [experiments](https://css-tricks.com/css-custom-properties-theming/)
