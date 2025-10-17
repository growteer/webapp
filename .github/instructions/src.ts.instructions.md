---
applyTo: "src/**/*.ts, src/**/*.tsx"
---

- Extract reusable stateful logic into **custom hooks** (e.g., `useDebounce`, `useLocalStorage`).
- Provide accurate type definitions for API responses, props, and state.
- Each function should have one primary responsibility. Functions should be kept small and focused.
- Favor pure functions, it makes logic easy to test.
- Prefer `async/await` syntax for asynchronous operations.
- Use `PascalCase` for all class names (e.g., `AuthClient`, `UserProfile`).
  - Use `camelCase` for all other names.
- For all components, functions and classes, tests should be created in a separate file with the same name and a `.test.ts` or `.test.tsx` suffix.
  - Create integration tests for complex components and features.
  - Create unit tests for utility functions, hooks, and simple components.
