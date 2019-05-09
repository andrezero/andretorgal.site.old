---
title: 'Principles: separation of concerns'
---

## Principles

- max separation of concerns (non negotiable)
  - no abstract classes leaking to markup
- careful of leaky abstractions
  - no styling across component boundaries
- components first
  - minimal global css (variables and base)
  - component is the entry point for everything else
- atomic aproach
- abstraction and composition

## Details

- minimal global css
- abstraction
  - utility and abstract mixins (`Shared/styles`)
  - abstract, presentation only, components (`Shared/<component>/*.mixin.scss`)
- composition:
  - atomic hierarchy (elements, blocks, groups, templates)
- tools:
  - post css to opt-in for (better than pre-css because it gets out of the way)

## Why

- the future is [web components](https://www.webcomponents.org/)
- the present is [pre](http://sass.news/) + [css](https://www.w3.org/Style/CSS/current-work) + [post](https://preset-env.cssdb.org/features)
- css custom properties - or "variables" - now widely supported (run-time!)
- css will one day have "mixins" - [@apply](https://hospodarets.com/css_apply_rule): a form of mixins, though not supporting arguments
- ... and hopefully "mixins" with arguments too

## Trade-offs

- bigger CSS files
