---
applyTo: "src/**/*"
---

# General

- **TypeScript First:** All new code should be written in **TypeScript**, leveraging its type safety features.
- **Descriptive Naming:** Use clear and descriptive names for variables, functions, components, and files (e.g., `getUserProfile`, `ProductCard`, `useAuth`).
- **DRY (Don't Repeat Yourself):** Extract reusable logic into functions, custom hooks, or components.
- **Modularization:** Break down complex problems and features into smaller, manageable units (components, functions, utilities).
- **Testable Code:** Design code to be easily testable.
- **Scoped Styles:** Ensure styles are scoped to avoid global conflicts.
- **Group code by feature, not by type**
- **Separate UI, logic, infrastructure and data fetching**
- **Functions / APIs should do one thing well. One level of abstraction per function**
- **Minimize API interface and expose only what's necessary**
- **Responsive Design:** Ensure components are responsive and work well on smartphones, FullHD desktops and anything in-between.

---

# State Management

- **Local State:** Use `useState` for component-level state.
- **Global State:** For global or shared state, prefer **Redux Toolkit**. Avoid prop drilling.

---

# Next.js Specific Guidelines

## Data Fetching & Rendering

- **App Router Preference:** Use the **App Router** for new development.
- **Server Components:** Prioritize fetching data in **Server Components** (`async` components in `app` directory) for better performance and security.
- **Data Fetching Methods:**
  - For build-time data or rarely changing content, prefer direct `fetch` in Server Components with `revalidate`.
  - For dynamic, frequently changing data, prefer direct `fetch` in Server Components.
  - Avoid client-side data fetching for initial page loads unless absolutely necessary (e.g., user-specific data after hydration).
- **Parallel Fetching:** When fetching multiple independent data sources, initiate requests in parallel.

## Routing

- **File-System Routing:** Use Next.js's App Route file-system convention.
- **Route Groups:** Utilize `(folderName)` to organize routes without affecting the URL path.
- **Dynamic Routes:** Define dynamic segments clearly (e.g., `[slug]`).
- **Middleware:** Suggest using `middleware.ts` for authentication, authorization, or other global request handling.

## Optimization

- **Image Optimization:** Always use `next/image` component for images.
- **Font Optimization:** Use `next/font` for optimizing fonts.
- **Dynamic Imports:** Use `next/dynamic` for lazy loading components to reduce initial bundle size.

## SEO & Accessibility

- **Metadata:** Use `generateMetadata` for SEO metadata.
- **Accessibility:** Emphasize semantic HTML, ARIA attributes, and keyboard navigation.

## Project Structure

- **Colocation:** Colocate component files (TSX, TS, CSS, Tests) within a feature folder.
- **Utility & Helper Modules:** All general utility functions, helper functions, and large, non-component-specific logic should be extracted into a dedicated `src/lib/` folder.
- **Private Folders:** Use underscore-prefixed folders (e.g., `_lib`, `_components`) for internal, non-route-related files within the `src/app` directory.
- **No Barrel Files:** Do not use barrel files (e.g., `index.ts` that re-exports from other files) for module exports. Always import directly from the specific file.

# Error Handling & Logging

- **Error Boundaries:** Implement error boundaries for React components where appropriate.
- **Logging:** Use a consistent logging strategy for debugging.
- **Graceful Degradation:** Ensure the application handles errors gracefully, providing fallback UI or messages.
