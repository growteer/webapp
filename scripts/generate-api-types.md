# API Type Generation

This document explains how to generate TypeScript types from your backend API specification.

## Options

### Option 1: OpenAPI Specification

If your backend provides an OpenAPI/Swagger specification:

1. Install the generator:
   ```bash
   pnpm add -D openapi-typescript
   ```

2. Add a script to `package.json`:
   ```json
   {
     "scripts": {
       "generate:api-types": "openapi-typescript <your-api-spec-url-or-file> -o src/lib/api/generated/api-types.ts"
     }
   }
   ```

3. Run the generation:
   ```bash
   pnpm generate:api-types
   ```

4. Import generated types in `src/lib/api/index.ts`:
   ```typescript
   export * from "./generated/api-types";
   ```

### Option 2: GraphQL Schema

If your backend uses GraphQL:

1. Install GraphQL Code Generator:
   ```bash
   pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
   ```

2. Create `codegen.yml` in the project root:
   ```yaml
   schema: <your-graphql-endpoint>
   documents: 'src/**/*.{graphql,gql}'
   generates:
     src/lib/api/generated/graphql-types.ts:
       plugins:
         - typescript
         - typescript-operations
   ```

3. Add a script to `package.json`:
   ```json
   {
     "scripts": {
       "generate:api-types": "graphql-codegen --config codegen.yml"
     }
   }
   ```

4. Run the generation:
   ```bash
   pnpm generate:api-types
   ```

## CI/CD Integration

Add the type generation step to your CI pipeline to ensure types stay in sync with the backend schema:

```yaml
# Example GitHub Actions step
- name: Generate API Types
  run: pnpm generate:api-types
```

## Usage

Once types are generated, use them throughout the application:

```typescript
import { apiClient } from "@/lib/api";
import type { User, CreateUserRequest } from "@/lib/api/generated";

// Types are now available
const response = await apiClient.post<CreateUserRequest, User>("/users", userData);
```
