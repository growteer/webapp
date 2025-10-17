# General Principles

- **Clean Code:** Prioritize **readability, maintainability, and reusability**.
- **Conciseness:** Aim for concise and expressive code.
- **Long, clear names over short, vague names, even at the cost of verbosity**
- **Environment Variables:** Use environment variables for configuration and sensitive data. Do not hardcode such values.

---

# Tech Stack

- **Styling:** Use Tailwind CSS v4.
- **State Management:** Use Redux Toolkit.
- **UI Components:** Use [shadcn/ui](https://ui.shadcn.com/llms.txt).
- **Package Management:** Use **pnpm** for managing dependencies. All package installations and scripts should use `pnpm` instead of `npm` or `yarn`.
- **Testing:** Use Jest and React Testing Library for unit and integration tests.

---

# Example of How Copilot Should Respond

- **Given:** `// Create a simple React functional component for a button.`
- **Expected Output:** A functional component using `PascalCase`, with a `React.FC` type, props destructuring, and appropriate event handlers, kept as concise as possible.
- **Given:** `// Implement a Next.js API route to fetch products.`
- **Expected Output:** A route handler that demonstrates server-side data fetching, proper error handling, and potentially uses server-only context for sensitive operations. Any complex data transformation should be suggested in a separate utility function.
