import { get } from 'svelte/store';
import { errorService, handleError, type AppError, ErrorType } from '../services/error/index';
import { _ } from 'svelte-i18n';

/**
 * Utility functions and decorators for error handling in different contexts
 */

/**
 * Async operation wrapper with automatic error handling
 */
export async function withErrorHandling<T>(
	operation: () => Promise<T>,
	context?: {
		source?: string;
		operation?: string;
		onError?: (error: AppError) => void;
		fallbackValue?: T;
	}
): Promise<T | undefined> {
	const result = await errorService.handleAsync(operation, {
		source: context?.source,
		operation: context?.operation,
		timestamp: new Date()
	});

	if (result.error) {
		context?.onError?.(result.error);
		return context?.fallbackValue;
	}

	return result.data;
}

/**
 * Form submission error handler
 */
export function handleFormError(error: unknown, formName: string): AppError {
	return handleError(error, {
		source: `Form:${formName}`,
		operation: 'submit',
		timestamp: new Date()
	});
}

/**
 * API call error handler with automatic retry logic
 */
export async function handleApiCall<T>(
	apiCall: () => Promise<T>,
	options: {
		maxRetries?: number;
		retryDelay?: number;
		context?: string;
	} = {}
): Promise<{ data?: T; error?: AppError }> {
	const { maxRetries = 1, retryDelay = 1000, context = 'API Call' } = options;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		const result = await errorService.handleAsync(apiCall, {
			source: 'API',
			operation: context,
			metadata: { attempt: attempt + 1, maxRetries: maxRetries + 1 },
			timestamp: new Date()
		});

		// If successful or last attempt, return result
		if (!result.error || attempt === maxRetries) {
			return result;
		}

		// Wait before retrying
		if (attempt < maxRetries) {
			await new Promise((resolve) => setTimeout(resolve, retryDelay));
		}
	}

	// This should never be reached, but TypeScript requires it
	return { error: errorService.createError(ErrorType.SYSTEM_UNKNOWN_ERROR, 'Unexpected error in retry logic') };
}

/**
 * Wallet operation error handler
 */
export function handleWalletError(error: unknown, operation: string): AppError {
	return handleError(error, {
		source: 'Wallet',
		operation,
		timestamp: new Date()
	});
}

/**
 * Component error handler for reactive statements and lifecycle
 */
export function handleComponentError(error: unknown, componentName: string, operation?: string): AppError {
	return handleError(error, {
		source: `Component:${componentName}`,
		operation: operation || 'render',
		timestamp: new Date()
	});
}

/**
 * Validation error creator with i18n support
 */
export function createValidationError(
	field: string,
	validationType: 'required' | 'invalid' | 'outOfRange',
	customMessage?: string
): AppError {
	const t = get(_);

	const errorTypeMap = {
		required: ErrorType.VALIDATION_REQUIRED_FIELD,
		invalid: ErrorType.VALIDATION_INVALID_FORMAT,
		outOfRange: ErrorType.VALIDATION_OUT_OF_RANGE
	};

	const message = customMessage || t(`errors.validation.${validationType.replace(/([A-Z])/g, '_$1').toLowerCase()}`);

	return errorService.createError(errorTypeMap[validationType], message, {
		context: {
			source: 'Validation',
			operation: 'validate',
			metadata: { field, validationType },
			timestamp: new Date()
		},
		showToast: false, // Validation errors are usually shown inline
		reportable: false
	});
}

/**
 * Error boundary wrapper for store subscriptions
 */
export function withErrorBoundary<T>(storeValue: T, fallbackValue: T, errorHandler?: (error: AppError) => void): T {
	try {
		return storeValue;
	} catch (error) {
		const appError = handleComponentError(error, 'Store', 'subscription');
		errorHandler?.(appError);
		return fallbackValue;
	}
}

/**
 * Promise rejection handler for unhandled promise rejections
 */
export function setupGlobalErrorHandlers(): void {
	// Handle unhandled promise rejections
	window.addEventListener('unhandledrejection', (event) => {
		const appError = handleError(event.reason, {
			source: 'Global',
			operation: 'unhandled_promise_rejection',
			timestamp: new Date()
		});

		// Prevent default browser behavior
		event.preventDefault();

		console.error('[Global Error Handler] Unhandled promise rejection:', appError);
	});

	// Handle general JavaScript errors
	window.addEventListener('error', (event) => {
		const appError = handleError(event.error || event.message, {
			source: 'Global',
			operation: 'javascript_error',
			metadata: {
				filename: event.filename,
				lineno: event.lineno,
				colno: event.colno
			},
			timestamp: new Date()
		});

		console.error('[Global Error Handler] JavaScript error:', appError);
	});
}

/**
 * Development-only error utilities
 */
export const devErrorUtils = {
	/**
	 * Simulate different error types for testing
	 */
	simulate: {
		networkError: () => {
			throw errorService.createError(ErrorType.API_NETWORK_ERROR, 'Simulated network error');
		},
		authError: () => {
			throw errorService.createError(ErrorType.AUTH_UNAUTHENTICATED, 'Simulated auth error');
		},
		walletError: () => {
			throw errorService.createError(ErrorType.WALLET_CONNECTION_FAILED, 'Simulated wallet error');
		}
	},

	/**
	 * Test error recovery mechanisms
	 */
	testRecovery: (errorType: ErrorType) => {
		const error = errorService.createError(errorType, `Test error for ${errorType}`);
		return errorService.getRecoveryActions(error);
	}
};
