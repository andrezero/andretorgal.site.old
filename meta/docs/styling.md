---
title: 'Styling'
tags: ['sass']
---

## tl;dr

- values are declared in `$settings`
- custom properties are declared in `:root {}` in global css `base`
- custom properties are used in global css, also in `base`
- custom properties are used in local css, in components

## Shared Base

### `src/Shared/styles/base/*`

- global css (minimal)
- global custom properties, declared in `:root`

```scss
// e.g: base/_layout.scss

#root {
  height: 100%;
}

:root {
  @include space-root;
}
```

## Shared Settings

### `src/Shared/styles/_settings`

- creates a global `$settings` map containing all the below global vars

### `src/Shared/styles/settings/*`

- `$color-primitives`
- `$color-groups`
- `$space-unit` pure scss variable - a number
- `$space-gaps` - in units
- `$space-containers` - in units
- `$space-breakpoints` - in units
- `$type-families`
- `$type-scale` a %
- `$type-sizes` - in rems
- `$type-weights`
- `$type-heights` - in rel

### `src/Shared/styles/lib/_settings`

- provides an API to read from `$settings`

- `settings($name)` - returns a variable, possibly a map
- `space-gap($name)` - number (units)
- `space-breakpoint($name)` - number (units)
- `space-container($name)` - map (width: units, gap: units)
- `color-group($name)` - map (fg, bg)
- `color($colorOrGroup, $color: null)` - color
- `type-family($name)` - string
- `type-size($name)` - rems
- `type-weight($name)`
- `type-height($name)` - rel

## Shared Mixins

### - `xxx-root`

- mixins for declaring css custom properties in `:root {}`

- e.g.:

  - `space-root`
  - `scheme-root`
  - `type-root`

- internally uses `@include vars-declare($root-scheme-base);`
- to produce `--root-scheme-base-bg: <default-value>`
- property naming convention e.g.: `root-scheme-primary-bg`

### - `xxx-base` and friends

- consume the variables

- e.g.:

  - `scheme-base`
  - `scheme-primary`
  - `scheme-secondary`

- internally uses `@include vars-use('color', $root-scheme-base, 'fg');`
- to produce `color: var(--root-scheme-base-fg, <default- value>)`

## lib

### creating and declaring variable maps

- easily output var declaration with consistent defaults
- represents each variable with a map containing:
  - `prop`: the full name for the custom property
  - `value`: the fallback value

```scss
$root-scheme-base-bg: (
  name: 'root-scheme-base-bg',
  value: pink
);
```

#### `@function vars-from-map($prefix, $map)`

create variable maps from vars/settings

```scss
$speeds: (
  fast: 300ms,
  slow: 1200ms
);
$some-component-speeds: vars-from-map('some-component-speeds', $speeds);
// $some-component-speeds: (
//   fast: (name: ..., value: 300ms),
//   slow: (name: ..., value: 1200ms)
// )
```

#### `@mixin vars-declare($vars)` - declare a map them all at once

```scss
.some-component {
  @mixin vars-declare($some-component-speeds);
}
```

results in

```css
.some-component {
  --some-component-speeds-fast: 300ms;
  --some-component-speeds-slow: 1200ms;
}
```
