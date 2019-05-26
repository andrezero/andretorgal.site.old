---
title: 'Coding Conventions: Group code by module / atomic-ish semantics'
tags: ['atomic-design']
---

## Details

- elements, blocks, groups, templates and behaviors (instead of atoms, molecules, ...)
- see [docs/project-structure](/meta/docs/project-structure#atomic-ish-semantics-translated-to)

## Why

- pedantic
- atomic-ish design system
- clearer module boundaries
- segregate shared components and utils from specific domains

## Trade-offs

- ugly enterprise import statements
- even uglier with all the `../../` (bloody typescript struggling with relative paths)
