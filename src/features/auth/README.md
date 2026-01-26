# Auth Feature Module

This is an example feature module demonstrating the feature-sliced architecture pattern.

## Structure

```
auth/
├── api/          # API client functions for this feature
├── components/   # Feature-specific UI components
├── hooks/        # Feature-specific React hooks
├── lib/          # Feature-specific utilities
└── types/        # Feature-specific TypeScript types
```

## Usage

### Components

```tsx
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return <LoginForm />;
}
```

### Hooks

```tsx
import { useAuth } from "@/features/auth/hooks/useAuth";

export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  // ...
}
```

### API Functions

```tsx
import { login } from "@/features/auth/api/auth";

const response = await login({ email: "user@example.com", password: "password" });
```

## Pattern

This feature demonstrates:
- **Separation of concerns**: Each folder has a specific purpose
- **Reusability**: Hooks and API functions can be used across components
- **Type safety**: Types are defined in the feature module
- **Integration**: Uses shared utilities (validation, API client) from `lib/`
