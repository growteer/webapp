# ADR-003: Internationalization with next-intl

## Status
Accepted

## Context

The application needs to support multiple languages (starting with English and German, with potential for more). We need an i18n solution that:
- Works seamlessly with Next.js 15 App Router
- Supports Server Components (default in Next.js App Router)
- Provides type-safe translations
- Supports SSR/SSG for SEO
- Handles locale-based routing
- Is actively maintained and compatible with Next.js 15

Alternative solutions considered:
- **react-i18next**: More complex setup, less optimized for Next.js App Router
- **next-i18next**: Designed for Pages Router, not ideal for App Router
- **Custom solution**: Too much maintenance overhead

## Decision

We will use **next-intl** for internationalization because:

1. **Built for Next.js App Router**: Native support for Server Components and App Router patterns
2. **Type-safe translations**: TypeScript support with autocomplete for translation keys
3. **SSR/SSG compatible**: Works with server-side rendering and static generation
4. **Route-based localization**: Supports locale-based routing (e.g., `/en/`, `/de/`)
5. **Active maintenance**: Regularly updated and compatible with Next.js 15
6. **Simple API**: Easy to use in both Server and Client Components

Implementation:
- Translation files in `src/locales/{locale}/common.json`
- Locale-based routing via `app/[locale]/` dynamic segment
- Middleware at `middleware.ts` handles locale detection and routing
- Use `getTranslations` in Server Components, `useTranslations` in Client Components
- Navigation uses `Link` from `@/lib/i18n/routing` (not Next.js Link) for locale awareness

## Consequences

### Positive

- **Seamless Next.js integration**: Designed specifically for App Router
- **Server Component support**: Works with the default Next.js pattern
- **Type safety**: Autocomplete and type checking for translation keys
- **SEO friendly**: SSR/SSG support for proper internationalization
- **Developer experience**: Simple, intuitive API
- **Performance**: Efficient bundle size, tree-shakeable

### Negative

- **Library dependency**: Additional dependency to maintain
- **Translation file management**: Need to keep JSON files in sync across locales
- **Navigation changes**: Must use next-intl's `Link` instead of Next.js `Link`

### Risks

- **Translation completeness**: Risk of missing translations for some locales. Use TypeScript to catch missing keys.
- **Performance**: Large translation files could impact bundle size, but JSON is efficiently tree-shaken.

## Implementation Notes

- Supported locales: `en` (default), `de`
- Translations organized by namespace: `common.*`, `navigation.*`, `footer.*`, `landing.*`
- Middleware redirects root to `/en/` by default
- All routes must be under `app/[locale]/` for proper locale handling
- See `.cursor/rules/i18n.mdc` for detailed usage patterns
