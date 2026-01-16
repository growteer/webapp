# Generated API Types

This directory contains auto-generated TypeScript types from your backend API specification (OpenAPI or GraphQL).

## Setup

See `scripts/generate-api-types.md` for instructions on setting up type generation.

## Structure

- Types are generated into files here (e.g., `api-types.ts` or `graphql-types.ts`)
- The types are exported from `src/lib/api/index.ts` for use throughout the application
- Never manually edit files in this directory - they are auto-generated
- Add this directory to `.gitignore` if types are generated in CI, or commit them if generated locally

## Integration

After generating types:

1. Update `src/lib/api/index.ts` to export the generated types:
   ```typescript
   export * from "./generated/api-types"; // or graphql-types
   ```

2. Use types in your API client functions:
   ```typescript
   import type { User, CreateUserRequest } from "@/lib/api";
   ```
