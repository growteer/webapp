# ADR-001: Feature-Sliced Architecture

## Status
Accepted

## Context

The Growteer web application is expected to grow significantly in complexity, with features including:
- Social feeds with different media types
- User and company profiles
- Job board
- Marketplace
- Chat functionality
- AI-based features
- Blockchain integration

We need a scalable folder structure that:
- Supports team collaboration (multiple developers working on different features)
- Enables feature independence and reusability
- Makes it easy to locate code related to a specific feature
- Prevents circular dependencies between features
- Allows easy extraction to micro-frontends later if needed

Traditional organization by file type (all components together, all hooks together) becomes difficult to navigate as the codebase grows and makes it harder to understand feature boundaries.

## Decision

We will adopt a **Feature-Sliced Architecture** pattern where:

1. **Feature modules** are self-contained in `src/features/{feature-name}/` with:
   - `api/` - API client functions for this feature
   - `components/` - Feature-specific UI components
   - `hooks/` - Feature-specific React hooks
   - `lib/` - Feature-specific utilities/logic
   - `types/` - Feature-specific TypeScript types

2. **Shared infrastructure** lives in `src/lib/`:
   - `api/` - Centralized API client
   - `i18n/` - Internationalization configuration
   - `react-query/` - React Query provider
   - `validation/` - Zod schemas and form helpers
   - `pwa/` - PWA utilities

3. **Shared UI components** live in `src/components/`:
   - `ui/` - Shadcn primitive components
   - `layout/` - Layout components (Header, Footer, Sidebar)
   - `forms/` - Reusable form components
   - `features/` - Feature-specific shared components

4. **Global concerns** are separate:
   - `src/store/` - Zustand stores (global state)
   - `src/types/` - Global TypeScript types
   - `src/hooks/` - Shared React hooks (not feature-specific)
   - `src/locales/` - Translation files

5. **Routes** follow Next.js App Router conventions in `src/app/[locale]/` with route groups using parentheses: `(auth)`, `(dashboard)`

## Consequences

### Positive

- **Clear feature boundaries**: Each feature is self-contained, making it easy to understand what code belongs to which feature
- **Team collaboration**: Multiple developers can work on different features without conflicts
- **Reusability**: Features can be reused or extracted independently
- **Scalability**: Easy to add new features without affecting existing ones
- **Discoverability**: Developers can quickly locate all code related to a feature in one place
- **Maintainability**: Changes to one feature are less likely to affect others

### Negative

- **Learning curve**: Team members need to understand the pattern
- **Initial setup**: More folders to create initially, but this is offset by the benefits as the project grows
- **Potential code duplication**: Features might have similar code, but this is intentional to maintain independence

### Risks

- **Feature coupling**: Must be careful not to create dependencies between features. Shared utilities should go in `lib/`, not in feature folders.
- **Over-abstraction**: Risk of creating too many layers. The pattern should be pragmatic, not dogmatic.

## Implementation Notes

- Each feature module should have a `README.md` explaining its purpose and usage
- Features should import from `lib/` and `components/`, not from other features directly
- When code is needed by multiple features, it should be promoted to `lib/` or `components/`
