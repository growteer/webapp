# ADR-002: State Management Strategy

## Status
Accepted

## Context

The application needs to manage multiple types of state:
- **Server state**: Data fetched from APIs (users, posts, jobs, etc.)
- **Global client state**: Authentication, UI preferences, real-time connections
- **Component state**: Local UI state (form inputs, modals, toggles)

Traditional approaches like:
- **Redux Toolkit**: Overkill for the expected complexity, adds boilerplate, larger bundle size
- **Context API**: Performance issues with frequent updates, difficult to persist
- **localState only**: Doesn't scale for complex shared state

We need a solution that:
- Handles server state efficiently (caching, refetching, synchronization)
- Manages global client state without excessive boilerplate
- Supports persistence for auth and preferences
- Keeps bundle size minimal
- Provides good developer experience

## Decision

We will use a **hybrid approach** combining multiple state management solutions:

### 1. TanStack Query (React Query) - Server State
- Use for ALL server/API data
- Provides automatic caching, refetching, background updates
- Handles optimistic updates
- Manages loading and error states
- Use in Client Components only

### 2. Zustand - Global Client State
- Use for auth state, UI preferences, real-time features
- Lightweight (~1KB), minimal boilerplate
- Supports persistence via middleware
- Simpler than Redux Toolkit
- Stores in `src/store/` (e.g., `authStore.ts`, `uiStore.ts`)

### 3. React Context - App-Wide Providers Only
- Use ONLY for truly app-wide providers (theme, i18n context)
- Avoid for feature-specific state

### 4. useState - Component-Scoped State
- Use for component-only state that doesn't need sharing
- Simple form state, UI toggles, etc.

## Consequences

### Positive

- **Separation of concerns**: Server state and client state are clearly separated
- **Automatic caching**: TanStack Query handles cache management automatically
- **Reduced boilerplate**: Zustand is much simpler than Redux
- **Type safety**: Both solutions work well with TypeScript
- **Performance**: TanStack Query optimizes API calls, Zustand is performant for client state
- **Persistence**: Zustand's persist middleware handles auth and preferences easily
- **Small bundle size**: Zustand is ~1KB, TanStack Query is tree-shakeable

### Negative

- **Multiple libraries**: Need to understand two different APIs (TanStack Query and Zustand)
- **Learning curve**: Team needs to know when to use which solution
- **Potential confusion**: Need clear guidelines on when to use what

### Risks

- **State duplication**: Risk of duplicating server state in Zustand. Must use TanStack Query for server state.
- **Over-engineering**: Could use too many state solutions. We limit to these four.

## Implementation Notes

- React Query provider is added to the locale layout (`src/app/[locale]/layout.tsx`)
- Zustand stores use TypeScript with strict typing
- Auth state is persisted using Zustand's `persist` middleware
- Clear cache on logout using `queryClient.clear()`
- See `.cursor/rules/state-management.mdc` for detailed usage patterns
