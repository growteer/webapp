# ADR-008: Data Fetching Strategy

## Status
Accepted

## Context

Next.js 15 App Router uses Server Components by default, which can fetch data directly. However, we also need:
- Client-side data fetching for interactive features
- Caching and refetching capabilities
- Optimistic updates
- Real-time data updates

We need clear guidance on when to use:
- Server Components with direct `fetch()`
- TanStack Query in Client Components
- Hybrid approaches

## Decision

We will use a **hybrid data fetching strategy**:

### Server Components (Default)

Use for:
- **Initial page data**: SEO-critical content, public data
- **Server-rendered content**: Data that benefits from SSR
- **Static/rarely changing data**: Can use `revalidate` for ISR
- **Parallel fetching**: Fetch multiple independent sources in parallel with `Promise.all()`

```typescript
// ✅ Server Component - fetch directly
export default async function Page() {
  const posts = await fetch("https://api.example.com/posts").then(r => r.json());
  return <PostsList posts={posts} />;
}
```

### TanStack Query (Client Components)

Use for:
- **User-specific data**: After hydration, user-specific content
- **Interactive features**: Data that needs reactivity, real-time updates
- **Optimistic updates**: When users perform actions (create, update, delete)
- **Caching/refetching**: Data that needs automatic background refetching
- **Pagination/infinite scroll**: Dynamic data loading

```typescript
// ✅ Client Component - use TanStack Query
"use client";
const { data } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => apiClient.get(`/users/${userId}`),
});
```

## Consequences

### Positive

- **Performance**: Server Components reduce client bundle size
- **SEO**: Server-rendered content improves SEO
- **Flexibility**: Can use the right tool for each use case
- **Caching**: TanStack Query provides excellent caching for client data
- **Developer experience**: Clear guidance on when to use what

### Negative

- **Complexity**: Need to understand two different patterns
- **Decision overhead**: Developers need to decide which approach to use

### Risks

- **Over-fetching on client**: Risk of fetching in Client Components when Server Components would suffice. Default to Server Components.
- **Server/client mismatch**: Hydration errors if server and client data differ. Use TanStack Query for client-specific data.

## Implementation Notes

- Default to Server Components - convert to Client Components only when needed
- Use consistent query keys: `["resource", id, ...filters]`
- Fetch in parallel in Server Components: `Promise.all([fetch1(), fetch2()])`
- Invalidate queries after mutations for cache consistency
- See `.cursor/rules/data-fetching.mdc` for detailed patterns
