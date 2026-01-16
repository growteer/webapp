# ADR-006: Validation with Zod and React Hook Form

## Status
Accepted

## Context

The application needs form validation for:
- User registration and login
- Profile updates
- Job postings
- Other user input forms

Requirements:
- Type-safe validation
- Good developer experience
- Integration with form handling
- Runtime validation (not just compile-time)
- Reusable validation schemas

Alternative approaches:
- **HTML5 validation**: Not sufficient for complex validation rules
- **Yup**: Similar to Zod, but Zod has better TypeScript inference
- **Joi**: Server-side focused, larger bundle
- **Manual validation**: Too much boilerplate, error-prone

## Decision

We will use **Zod for schema validation** and **React Hook Form for form handling**:

1. **Zod schemas**: Define validation rules in `src/lib/validation/schemas.ts`
   - Reusable schemas (email, password, etc.)
   - Feature-specific schemas can live in feature folders
   - Type inference: `z.infer<typeof schema>` for TypeScript types

2. **React Hook Form**: Form state management and handling
   - Integrates with Zod via `@hookform/resolvers/zod`
   - Provides `useTypedForm` helper in `lib/validation/form-helpers.tsx`
   - Handles form state, validation, error display

3. **Validation utilities**: Helper functions in `lib/validation/`
   - `getFieldError()` - Get error message for specific field
   - `formatZodErrors()` - Format Zod errors for display

## Consequences

### Positive

- **Type safety**: Schema validation with TypeScript inference
- **Reusability**: Common schemas (email, password) can be reused
- **Runtime validation**: Validates actual user input, not just types
- **Developer experience**: Good integration between Zod and React Hook Form
- **Bundle size**: Zod is lightweight (~10KB)
- **Composability**: Schemas can be composed and extended

### Negative

- **Two libraries**: Need to understand both Zod and React Hook Form
- **Learning curve**: Team needs to learn Zod schema syntax
- **Schema duplication**: If API types are generated, validation schemas are separate (but necessary for runtime validation)

### Risks

- **Schema drift**: Validation schemas might drift from API types. This is acceptable as they serve different purposes (runtime validation vs type safety).
- **Over-validation**: Risk of too many validation rules making forms difficult. Keep validation focused on essential rules.

## Implementation Notes

- Use `useTypedForm` from `@/lib/validation/form-helpers` for type-safe forms
- Common schemas exported from `lib/validation/schemas.ts`
- Types inferred from schemas: `type LoginFormData = z.infer<typeof loginSchema>`
- Validation happens on blur by default (configurable)
- See `.cursor/rules/validation.mdc` for detailed usage patterns
