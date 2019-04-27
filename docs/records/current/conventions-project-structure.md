---
title: 'Coding Conventions: Group code by module / atomic-ish semantics'
---

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
