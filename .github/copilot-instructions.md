---
applyTo: '**'
---

# Project general coding standards

## Scripts

- Use `pnpm` for package management
- Use `pnpm dev` for development
- Use `pnpm build` for production builds
- Use `pnpm test` for running tests
- Use `pnpm lint` for linting the codebase
- Use `pnpm format` for formatting the codebase

## Technology Stack

- Use Svelte for UI components
- Use TypeScript for type safety and better tooling
- Use Flowbite for UI components and styles
- Use Tailwindcss v4 for additional styling
- Use Vite as the build tool
- Use Vitest for testing
- Use pnpm as the package manager
- Use Storybook for component development and documentation
- Use dotenv for environment variable management
- Use Playwright for end-to-end testing

## Code Style

- Follow the [Svelte Style Guide](https://svelte.dev/docs#style-guide)

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants
- Use descriptive names that convey purpose
- Avoid abbreviations unless they are well-known (e.g., `URL`, `API`)

## Code Structure

- Structure components to be reusable, following Atomic Design principles
- Organize files by feature or module rather than type
- Use index files to simplify imports
- Maintain a consistent file naming convention (e.g., `ComponentName.svelte`)
- Place tests next to the files they test (e.g., `ComponentName.test.svelte`)

## Comments and Documentation

- Write clear, concise comments explaining complex logic
- Avoid redundant comments; code should be self-explanatory

## Error Handling

- Use try/catch blocks for async operations
- Implement proper error boundaries in components
- Avoid swallowing errors silently; handle them appropriately
