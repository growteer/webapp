# ADR-005: API Type Generation from Schema

## Status
Accepted

## Context

The backend provides either an OpenAPI specification or a GraphQL schema. We need TypeScript types for:
- API request/response types
- Error types
- Schema validation

Options:
1. **Manual types**: Write types manually and keep them in sync with backend
2. **Generate from schema**: Auto-generate types from OpenAPI/GraphQL schema
3. **Runtime validation**: Use Zod schemas and infer types from them

Manual types are error-prone and don't scale. Runtime validation with Zod is useful for forms but redundant for API types if we have a schema.

## Decision

We will **auto-generate TypeScript types** from the backend schema:

1. **OpenAPI**: Use `openapi-typescript` or `@hey-api/openapi-ts` to generate types from OpenAPI spec
2. **GraphQL**: Use `@graphql-codegen/cli` with TypeScript plugins to generate types from GraphQL schema
3. **Generated types location**: `src/lib/api/generated/`
4. **Export**: Generated types exported from `src/lib/api/index.ts`
5. **CI/CD integration**: Type generation runs in CI to ensure types stay in sync with backend

For runtime validation (forms, user input), we still use Zod schemas. API types are primarily for type safety, not runtime validation.

## Consequences

### Positive

- **Type safety**: Types automatically match backend schema
- **Reduced errors**: No manual synchronization between frontend and backend types
- **Scalability**: Works well as API grows
- **Single source of truth**: Backend schema is the source of truth
- **Developer experience**: Autocomplete and type checking in IDE
- **CI safety**: Types regenerated on backend changes catch breaking changes early

### Negative

- **Build step**: Requires running generation script during development
- **Dependency on schema**: If backend doesn't provide schema, can't generate types
- **Schema quality**: Generated types only as good as the schema

### Risks

- **Schema changes**: Breaking schema changes require frontend updates. CI will catch this.
- **Missing schema**: If backend doesn't provide schema, fall back to manual types or runtime validation.

## Implementation Notes

- Setup documentation in `scripts/generate-api-types.md`
- Generated types are committed to repository (or generated in CI)
- `src/lib/api/generated/.gitkeep` ensures directory exists
- Feature API functions import types from `@/lib/api` (generated types)
- See `.cursor/rules/typescript.mdc` for type generation patterns
