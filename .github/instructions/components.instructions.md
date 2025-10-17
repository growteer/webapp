---
applyTo: "src/**/*.tsx"
---

# General

- **Functional Components & Hooks:** Prefer functional components with React Hooks.
- **Single Responsibility:** Each component should have one primary responsibility. Components should be kept small and focused.
- **Component Naming:** Use `PascalCase` for all component names (e.g., `MyButton`, `UserAvatar`).
- **Props:**
  - Use `camelCase` for prop names.
  - Destructure props in the component's function signature.
  - Provide clear `interface` definitions for props.
- **Immutability:** Never mutate props or state directly. Always create new objects or arrays for updates.
- **Fragments:** Use `React.Fragment` to avoid unnecessary DOM wrapper elements.

# Performance

- **Keys:** Always provide a unique and stable `key` prop when mapping over lists. Do not use array `index` as a key if the list can change.
- **Lazy Loading:** Suggest `React.lazy` and `Suspense` for code splitting large components or routes.
