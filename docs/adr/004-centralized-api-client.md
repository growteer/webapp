# ADR-004: Centralized API Client

## Status
Accepted

## Context

The application will make many API calls to the backend. We need a consistent approach for:
- Making HTTP requests
- Handling authentication tokens
- Managing request/response interceptors
- Error handling and retries
- Request/response transformation
- Timeout handling

Without a centralized client, each API call would need to:
- Manually add authentication headers
- Handle errors individually
- Manage base URLs and endpoints
- Implement timeout logic
- Handle 401 redirects

This leads to code duplication and inconsistent error handling.

## Decision

We will use a **centralized API client** (`ApiClient` class) located in `src/lib/api/client.ts`:

1. **Single source of truth** for all API communication
2. **Automatic token injection**: Reads auth token from Zustand store
3. **Consistent error handling**: Standardized error response format
4. **401 handling**: Automatically clears auth and redirects to login
5. **Type safety**: Generic methods with TypeScript types for request/response
6. **Configurable**: Supports custom base URLs, headers, timeouts

All API calls must use `apiClient` from `@/lib/api`:
- Feature-specific API functions in `features/{feature}/api/` import and use `apiClient`
- Methods: `get()`, `post()`, `put()`, `patch()`, `delete()`
- Returns `ApiResponse<T>` with `success` and `error` fields

## Consequences

### Positive

- **Consistency**: All API calls follow the same pattern
- **DRY principle**: No duplication of request/response handling code
- **Centralized auth**: Token handling in one place
- **Error handling**: Consistent error responses across the app
- **Type safety**: TypeScript generics ensure type-safe API calls
- **Easy to modify**: Changes to auth/error handling affect all calls automatically
- **Testability**: Can mock the client easily for testing

### Negative

- **Abstraction layer**: Additional layer between features and the API
- **Learning curve**: Team needs to understand the client API

### Risks

- **Over-abstraction**: Risk of making the client too complex. Keep it simple and focused.
- **Flexibility**: Some requests might need special handling. The client should be extensible.

## Implementation Notes

- API client uses `fetch` under the hood (native browser API)
- Auth token is read from Zustand store (`auth-storage` in localStorage)
- 401 errors trigger automatic logout and redirect
- Base URL configured via `API_BASE_URL` constant in `lib/constants/`
- Timeout defaults to 30 seconds, configurable per request
- See `.cursor/rules/api-layer.mdc` for detailed usage patterns
