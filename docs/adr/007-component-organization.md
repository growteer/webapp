# ADR-007: Component Organization Patterns

## Status
Accepted

## Context

We need clear rules for where components should live:
- Shared UI components (buttons, inputs)
- Layout components (header, footer)
- Feature-specific components
- Page-level components

Without clear organization:
- Components become hard to find
- Developers duplicate components unnecessarily
- No clear distinction between shared and feature-specific code
- Difficult to understand component hierarchy

## Decision

We will organize components into clear categories:

### 1. Shared Components (`src/components/`)
- **`ui/`**: Shadcn primitive components (Button, Input, Label, etc.)
- **`layout/`**: Layout components used across routes (Header, Footer, Sidebar)
- **`forms/`**: Reusable form components (not feature-specific)
- **`features/`**: Feature-specific shared components that are reused (e.g., landing page components)

### 2. Feature Components (`src/features/{feature}/components/`)
- Feature-specific UI components
- Only imported within the feature or promoted to `components/features/` if shared
- Should not import from other features directly

### 3. Page Components
- Can live in route folders if truly page-specific
- Usually thin wrappers that compose feature components

### Default to Server Components
- Server Components are the default in Next.js App Router
- Use Client Components (`"use client"`) only when needed:
  - Interactive features (onClick, useState, useEffect)
  - Browser APIs
  - React Query hooks (Client Components only)

## Consequences

### Positive

- **Clear hierarchy**: Easy to understand where components belong
- **Reusability**: Shared components are easy to find and reuse
- **Feature isolation**: Feature components are self-contained
- **Discoverability**: Developers know where to look for components
- **Server-first**: Defaulting to Server Components reduces bundle size

### Negative

- **Decisions required**: Developers need to decide where components belong
- **Potential duplication**: Similar components might exist in multiple features (acceptable for independence)

### Risks

- **Over-sharing**: Risk of making components too generic. Prefer composition over abstraction.
- **Under-sharing**: Risk of duplicating components. If used by 3+ features, promote to `components/`.

## Implementation Notes

- Shadcn components installed via CLI go to `components/ui/`
- Feature components should be self-contained
- Use composition: prefer small, focused components over large monolithic ones
- Server Components can't use hooks or browser APIs - convert to Client Components when needed
- See `.cursor/rules/components.mdc` for detailed usage patterns
