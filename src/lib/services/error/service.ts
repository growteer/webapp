import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';
import { toastError, toastSuccess, toastWarning } from '../toast';
import type { AppError, ErrorContext, ErrorHandlerConfig, ErrorBoundaryState } from './types';
import { ErrorType, ErrorSeverity, ErrorDomain, RecoveryAction } from './types';

/**
 * Central error handling service that provides consistent error processing,
 * logging, and user notification across the entire application
 */
class ErrorService {
	private config: ErrorHandlerConfig = {
		enableToasts: true,
		enableConsoleLogging: true,
		enableErrorReporting: false
	};

	/**
	 * Configure the error service
	 */
	configure(config: Partial<ErrorHandlerConfig>): void {
		this.config = { ...this.config, ...config };
	}

	/**
	 * Main error handling method - processes any error and takes appropriate actions
	 */
	handle(error: unknown, context?: ErrorContext): AppError {
		const appError = this.normalizeError(error, context);

		// Log error if enabled
		if (this.config.enableConsoleLogging) {
			this.logError(appError);
		}

		// Show toast notification if appropriate
		if (this.config.enableToasts && appError.showToast) {
			this.displayToast(appError);
		}

		// Report error if enabled and reportable
		if (this.config.enableErrorReporting && appError.reportable) {
			this.reportError(appError);
		}

		return appError;
	}

	/**
	 * Handle async operations with automatic error processing
	 */
	async handleAsync<T>(operation: () => Promise<T>, context?: ErrorContext): Promise<{ data?: T; error?: AppError }> {
		try {
			const data = await operation();
			return { data };
		} catch (error) {
			const appError = this.handle(error, context);
			return { error: appError };
		}
	}

	/**
	 * Create a standardized AppError from any error type
	 */
	createError(type: ErrorType, message: string, options: Partial<AppError> = {}): AppError {
		const domain = this.getDomainFromType(type);
		const severity = options.severity ?? this.getDefaultSeverity(type);

		return {
			type,
			message,
			severity,
			domain,
			displayToUser: options.displayToUser ?? true,
			showToast: options.showToast ?? true,
			reportable: options.reportable ?? severity === ErrorSeverity.CRITICAL,
			context: options.context,
			cause: options.cause,
			recoveryActions: options.recoveryActions
		};
	}

	/**
	 * Normalize any error into a standardized AppError
	 */
	private normalizeError(error: unknown, context?: ErrorContext): AppError {
		// If it's already an AppError, enhance with context
		if (this.isAppError(error)) {
			return {
				...error,
				context: { ...error.context, ...context }
			};
		}

		// Apply custom transformer if available
		if (this.config.errorTransformer) {
			return this.config.errorTransformer(error);
		}

		// Handle standard Error objects
		if (error instanceof Error) {
			return this.createError(ErrorType.SYSTEM_UNKNOWN_ERROR, error.message, {
				cause: error,
				context,
				severity: ErrorSeverity.CRITICAL
			});
		}

		// Handle string errors
		if (typeof error === 'string') {
			return this.createError(ErrorType.SYSTEM_UNKNOWN_ERROR, error, {
				context,
				severity: ErrorSeverity.WARNING
			});
		}

		// Handle unknown error types
		return this.createError(ErrorType.SYSTEM_UNKNOWN_ERROR, 'An unknown error occurred', {
			cause: error,
			context,
			severity: ErrorSeverity.CRITICAL
		});
	}

	/**
	 * Display appropriate toast notification for the error
	 */
	private displayToast(error: AppError): void {
		const message = this.getLocalizedMessage(error);

		switch (error.severity) {
			case ErrorSeverity.CRITICAL:
				toastError(message);
				break;
			case ErrorSeverity.WARNING:
				toastWarning(message);
				break;
			case ErrorSeverity.INFO:
				toastSuccess(message);
				break;
		}
	}

	/**
	 * Get localized error message using i18n service
	 */
	private getLocalizedMessage(error: AppError): string {
		const t = get(_);
		const i18nKey = `errors.${error.type}`;

		// Try to get localized message
		const localizedMessage = t(i18nKey);

		// Fall back to original message if no translation found
		return localizedMessage !== i18nKey ? localizedMessage : error.message;
	}

	/**
	 * Log error to console with structured information
	 */
	private logError(error: AppError): void {
		const logLevel =
			error.severity === ErrorSeverity.CRITICAL ? 'error' : error.severity === ErrorSeverity.WARNING ? 'warn' : 'info';

		console[logLevel]('[ErrorService]', {
			type: error.type,
			message: error.message,
			severity: error.severity,
			domain: error.domain,
			context: error.context,
			cause: error.cause,
			timestamp: new Date().toISOString()
		});
	}

	/**
	 * Report error to external error tracking service
	 */
	private reportError(error: AppError): void {
		// TODO: Integrate with error reporting service (e.g., Sentry, LogRocket)
		console.info('[ErrorService] Error reported:', error.type);
	}

	/**
	 * Extract domain from error type
	 */
	private getDomainFromType(type: ErrorType): ErrorDomain {
		const domain = type.split('.')[0] as ErrorDomain;
		return Object.values(ErrorDomain).includes(domain) ? domain : ErrorDomain.SYSTEM;
	}

	/**
	 * Get default severity for error type
	 */
	private getDefaultSeverity(type: ErrorType): ErrorSeverity {
		// Critical errors that break functionality
		const criticalTypes = [
			ErrorType.AUTH_SESSION_EXPIRED,
			ErrorType.API_SERVER_ERROR,
			ErrorType.WALLET_CONNECTION_FAILED,
			ErrorType.SYSTEM_CONFIGURATION_ERROR,
			ErrorType.STORAGE_CORRUPTION
		];

		// Warning errors that affect UX but don't break functionality
		const warningTypes = [
			ErrorType.API_TIMEOUT,
			ErrorType.WALLET_USER_REJECTED,
			ErrorType.VALIDATION_INVALID_FORMAT,
			ErrorType.EXTERNAL_SERVICE_UNAVAILABLE
		];

		if (criticalTypes.includes(type)) {
			return ErrorSeverity.CRITICAL;
		}

		if (warningTypes.includes(type)) {
			return ErrorSeverity.WARNING;
		}

		return ErrorSeverity.INFO;
	}

	/**
	 * Type guard to check if error is already an AppError
	 */
	private isAppError(error: unknown): error is AppError {
		return (
			typeof error === 'object' &&
			error !== null &&
			'type' in error &&
			'message' in error &&
			'severity' in error &&
			'domain' in error
		);
	}

	/**
	 * Create error boundary state for components
	 */
	createErrorBoundary(error?: AppError): ErrorBoundaryState {
		return {
			hasError: !!error,
			error,
			showFallback: error ? error.severity === ErrorSeverity.CRITICAL : false,
			fallbackMessage: error ? this.getLocalizedMessage(error) : undefined
		};
	}

	/**
	 * Get suggested recovery actions for an error
	 */
	getRecoveryActions(error: AppError): RecoveryAction[] {
		if (error.recoveryActions) {
			return error.recoveryActions;
		}

		// Default recovery actions based on error type
		switch (error.type) {
			case ErrorType.API_NETWORK_ERROR:
			case ErrorType.API_TIMEOUT:
				return [RecoveryAction.CHECK_NETWORK, RecoveryAction.RETRY];

			case ErrorType.AUTH_SESSION_EXPIRED:
			case ErrorType.AUTH_UNAUTHENTICATED:
				return [RecoveryAction.REFRESH, RecoveryAction.NAVIGATE_HOME];

			case ErrorType.WALLET_CONNECTION_FAILED:
				return [RecoveryAction.RETRY, RecoveryAction.CHECK_NETWORK];

			case ErrorType.SYSTEM_UNKNOWN_ERROR:
				return [RecoveryAction.REFRESH, RecoveryAction.CONTACT_SUPPORT];

			default:
				return [RecoveryAction.RETRY];
		}
	}
}

// Export singleton instance
export const errorService = new ErrorService();

/**
 * Convenience function for handling errors with context
 */
export function handleError(error: unknown, context?: ErrorContext): AppError {
	return errorService.handle(error, context);
}

/**
 * Convenience function for async operations
 */
export async function handleAsync<T>(
	operation: () => Promise<T>,
	context?: ErrorContext
): Promise<{ data?: T; error?: AppError }> {
	return errorService.handleAsync(operation, context);
}

/**
 * Create pre-configured error creators for common domains
 */
export const createAuthError = (type: ErrorType, message: string, context?: ErrorContext) =>
	errorService.createError(type, message, { context, domain: ErrorDomain.AUTH });

export const createApiError = (type: ErrorType, message: string, context?: ErrorContext) =>
	errorService.createError(type, message, { context, domain: ErrorDomain.API });

export const createWalletError = (type: ErrorType, message: string, context?: ErrorContext) =>
	errorService.createError(type, message, { context, domain: ErrorDomain.WALLET });

export const createValidationError = (type: ErrorType, message: string, context?: ErrorContext) =>
	errorService.createError(type, message, { context, domain: ErrorDomain.VALIDATION });
