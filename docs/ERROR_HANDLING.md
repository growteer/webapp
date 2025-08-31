# Error Handling Architecture Implementation Guide

## Overview

This comprehensive error handling system provides consistent error processing, user notification, and recovery mechanisms across the entire application.

## Architecture Components

### 1. Core Error System

- **`/src/lib/services/error/types.ts`** - Error classification and type definitions
- **`/src/lib/services/error/service.ts`** - Central error processing service
- **`/src/lib/services/error/index.ts`** - Main exports

### 2. Integration Layer

- **`/src/lib/utils/error-handling.ts`** - Utility functions for common scenarios
- **`/src/lib/utils/error-patterns.ts`** - Implementation patterns and examples
- **`/src/lib/components/error/ErrorBoundary.svelte`** - Error boundary component

### 3. Enhanced Services

- **`/src/lib/services/toast/index.ts`** - Enhanced toast service with error context
- **`/src/lib/api/client/enhanced-client-new.ts`** - API client with error handling

## Key Features

### Error Classification

- **Domains**: Auth, API, Wallet, UI, Validation, External, Storage, System
- **Severity Levels**: Critical, Warning, Info
- **Context Tracking**: Source, operation, metadata, timestamps

### Automatic Error Processing

- **Toast Notifications**: Automatic display based on error severity
- **Internationalization**: All error messages support i18n
- **Recovery Actions**: Suggested user actions for error resolution
- **Logging**: Structured error logging for debugging

### Error Boundaries

- **Component Protection**: Graceful error handling in UI components
- **Fallback UI**: Critical error fallback interfaces
- **Recovery Mechanisms**: User-triggered error recovery

## Integration Patterns

### 1. Form Error Handling

```typescript
import { withErrorHandling, createValidationError } from '$lib/utils/error-handling';

const handleSubmit = async (formData: FormData) => {
	// Validation
	if (!email) {
		const error = createValidationError('email', 'required');
		errorService.handle(error);
		return;
	}

	// Submission
	await withErrorHandling(() => submitForm(formData), { source: 'ContactForm', operation: 'submit' });
};
```

### 2. API Calls

```typescript
import { enhancedMutate } from '$lib/api/client/enhanced-client-new';

const result = await enhancedMutate(mutation, {
	operationName: 'UpdateProfile',
	source: 'ProfileForm'
});

if (result.success) {
	// Handle success
} else if (result.appError) {
	// Error automatically handled by service
}
```

### 3. Component Error Boundaries

```svelte
<script>
	import ErrorBoundary from '$lib/components/error/ErrorBoundary.svelte';
	import { handleComponentError } from '$lib/utils/error-handling';

	let errorState = $state();

	// Error handling in reactive statements
	$effect(() => {
		try {
			// Reactive logic
		} catch (error) {
			errorState = handleComponentError(error, 'MyComponent');
		}
	});
</script>

<ErrorBoundary error={errorState} on:retry={() => window.location.reload()}>
	<!-- Component content -->
</ErrorBoundary>
```

### 4. Wallet Operations

```typescript
import { handleWalletError } from '$lib/utils/error-handling';

try {
	const result = await wallet.connect();
	return result;
} catch (error) {
	const appError = handleWalletError(error, 'connect');
	// Error automatically processed and displayed
	return null;
}
```

## Global Setup

Add to your app initialization (e.g., `app.html` or main layout):

```typescript
import { setupGlobalErrorHandlers } from '$lib/utils/error-handling';
import { errorService } from '$lib/services/error';

// Configure error service
errorService.configure({
	enableToasts: true,
	enableConsoleLogging: true,
	enableErrorReporting: false // Set to true in production
});

// Setup global error handlers
setupGlobalErrorHandlers();
```

## Migration Strategy

### Phase 1: Core Infrastructure ✅

- [x] Error type definitions
- [x] Error service implementation
- [x] Enhanced toast service
- [x] Error boundary component
- [x] Utility functions
- [x] I18n error messages

Next Steps for Integration:
Import the error service in your main app layout
Replace existing toastError calls with the new error handling utilities
Add ErrorBoundary components to your route layouts
Update form components to use validation error helpers
Configure global error handlers for unhandled promise rejections

### Phase 2: Service Integration

- [ ] Update existing API client usage
- [ ] Migrate form components
- [ ] Update wallet service integration
- [ ] Add error boundaries to route components

### Phase 3: Component Migration

- [ ] Update profile form
- [ ] Update onboarding form
- [ ] Update authentication components
- [ ] Add global error handlers

### Phase 4: Testing & Polish

- [ ] Comprehensive error handling tests
- [ ] Error recovery testing
- [ ] Toast notification UX refinement
- [ ] Production error reporting setup

## Benefits

1. **Consistency**: Uniform error handling across all components
2. **User Experience**: Clear, actionable error messages with recovery options
3. **Maintainability**: Centralized error logic reduces code duplication
4. **Internationalization**: All error messages support multiple languages
5. **Debugging**: Structured error logging with context information
6. **Resilience**: Automatic retry and recovery mechanisms
7. **Scalability**: Easy to extend with new error types and domains
