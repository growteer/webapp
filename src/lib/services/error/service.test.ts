import { describe, it, expect, vi, beforeEach } from 'vitest';
import { errorService } from './service';
import { ErrorType, ErrorSeverity, ErrorDomain, RecoveryAction, type AppError, type ErrorContext } from './types';

// Mock dependencies
vi.mock('svelte-i18n', () => ({
	_: { subscribe: vi.fn(), set: vi.fn() },
	get: vi.fn(() => (key: string) => key)
}));

vi.mock('../toast', () => ({
	toastError: vi.fn(),
	toastSuccess: vi.fn(),
	toastWarning: vi.fn()
}));

describe('ErrorService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		errorService.configure({
			enableToasts: true,
			enableConsoleLogging: false, // Disable for tests
			enableErrorReporting: false
		});
	});

	describe('handle method', () => {
		it('should handle AppError and preserve properties', () => {
			const appError: AppError = {
				type: ErrorType.AUTH_UNAUTHENTICATED,
				message: 'Test auth error',
				severity: ErrorSeverity.WARNING,
				domain: ErrorDomain.AUTH,
				displayToUser: true,
				showToast: true,
				reportable: false
			};

			const result = errorService.handle(appError);

			expect(result).toEqual(appError);
		});

		it('should normalize Error objects to AppError', () => {
			const error = new Error('Test error message');
			const context: ErrorContext = {
				source: 'TestComponent',
				operation: 'test'
			};

			const result = errorService.handle(error, context);

			expect(result.type).toBe(ErrorType.SYSTEM_UNKNOWN_ERROR);
			expect(result.message).toBe('Test error message');
			expect(result.severity).toBe(ErrorSeverity.CRITICAL);
			expect(result.domain).toBe(ErrorDomain.SYSTEM);
			expect(result.context?.source).toBe('TestComponent');
			expect(result.cause).toBe(error);
		});

		it('should normalize string errors to AppError', () => {
			const errorMessage = 'String error message';

			const result = errorService.handle(errorMessage);

			expect(result.type).toBe(ErrorType.SYSTEM_UNKNOWN_ERROR);
			expect(result.message).toBe(errorMessage);
			expect(result.severity).toBe(ErrorSeverity.WARNING);
			expect(result.domain).toBe(ErrorDomain.SYSTEM);
		});

		it('should handle unknown error types', () => {
			const unknownError = { someProperty: 'value' };

			const result = errorService.handle(unknownError);

			expect(result.type).toBe(ErrorType.SYSTEM_UNKNOWN_ERROR);
			expect(result.message).toBe('An unknown error occurred');
			expect(result.severity).toBe(ErrorSeverity.CRITICAL);
			expect(result.cause).toBe(unknownError);
		});
	});

	describe('createError method', () => {
		it('should create AppError with correct domain from type', () => {
			const result = errorService.createError(ErrorType.AUTH_UNAUTHENTICATED, 'Auth error message');

			expect(result.type).toBe(ErrorType.AUTH_UNAUTHENTICATED);
			expect(result.message).toBe('Auth error message');
			expect(result.domain).toBe(ErrorDomain.AUTH);
			expect(result.severity).toBe(ErrorSeverity.WARNING);
		});

		it('should override default properties when provided', () => {
			const context: ErrorContext = {
				source: 'TestSource',
				operation: 'testOp'
			};

			const result = errorService.createError(ErrorType.API_SERVER_ERROR, 'Custom message', {
				severity: ErrorSeverity.INFO,
				context,
				showToast: false,
				reportable: true
			});

			expect(result.severity).toBe(ErrorSeverity.INFO);
			expect(result.context).toEqual(context);
			expect(result.showToast).toBe(false);
			expect(result.reportable).toBe(true);
		});
	});

	describe('handleAsync method', () => {
		it('should return data on successful operation', async () => {
			const testData = { result: 'success' };
			const operation = vi.fn().mockResolvedValue(testData);

			const result = await errorService.handleAsync(operation);

			expect(result.data).toEqual(testData);
			expect(result.error).toBeUndefined();
		});

		it('should return error on failed operation', async () => {
			const testError = new Error('Operation failed');
			const operation = vi.fn().mockRejectedValue(testError);
			const context: ErrorContext = {
				source: 'TestOperation',
				operation: 'test'
			};

			const result = await errorService.handleAsync(operation, context);

			expect(result.data).toBeUndefined();
			expect(result.error).toBeDefined();
			expect(result.error?.type).toBe(ErrorType.SYSTEM_UNKNOWN_ERROR);
			expect(result.error?.context?.source).toBe('TestOperation');
		});
	});

	describe('error severity classification', () => {
		it('should classify critical errors correctly', () => {
			const criticalTypes = [
				ErrorType.AUTH_SESSION_EXPIRED,
				ErrorType.API_SERVER_ERROR,
				ErrorType.WALLET_CONNECTION_FAILED,
				ErrorType.SYSTEM_CONFIGURATION_ERROR
			];

			criticalTypes.forEach((type) => {
				const error = errorService.createError(type, 'Test message');
				expect(error.severity).toBe(ErrorSeverity.CRITICAL);
			});
		});

		it('should classify warning errors correctly', () => {
			const warningTypes = [ErrorType.API_TIMEOUT, ErrorType.WALLET_USER_REJECTED, ErrorType.VALIDATION_INVALID_FORMAT];

			warningTypes.forEach((type) => {
				const error = errorService.createError(type, 'Test message');
				expect(error.severity).toBe(ErrorSeverity.WARNING);
			});
		});
	});

	describe('domain classification', () => {
		it('should extract domain from error type correctly', () => {
			const testCases = [
				{ type: ErrorType.AUTH_UNAUTHENTICATED, expectedDomain: ErrorDomain.AUTH },
				{ type: ErrorType.API_NETWORK_ERROR, expectedDomain: ErrorDomain.API },
				{ type: ErrorType.WALLET_CONNECTION_FAILED, expectedDomain: ErrorDomain.WALLET },
				{ type: ErrorType.VALIDATION_REQUIRED_FIELD, expectedDomain: ErrorDomain.VALIDATION }
			];

			testCases.forEach(({ type, expectedDomain }) => {
				const error = errorService.createError(type, 'Test message');
				expect(error.domain).toBe(expectedDomain);
			});
		});
	});

	describe('recovery actions', () => {
		it('should suggest appropriate recovery actions for network errors', () => {
			const error = errorService.createError(ErrorType.API_NETWORK_ERROR, 'Network error');
			const actions = errorService.getRecoveryActions(error);

			expect(actions).toContain('check_network');
			expect(actions).toContain('retry');
		});

		it('should suggest appropriate recovery actions for auth errors', () => {
			const error = errorService.createError(ErrorType.AUTH_SESSION_EXPIRED, 'Session expired');
			const actions = errorService.getRecoveryActions(error);

			expect(actions).toContain('refresh');
			expect(actions).toContain('navigate_home');
		});

		it('should use custom recovery actions when provided', () => {
			const customActions = [RecoveryAction.RETRY, RecoveryAction.REFRESH];
			const error = errorService.createError(ErrorType.SYSTEM_UNKNOWN_ERROR, 'Test error', {
				recoveryActions: customActions
			});

			const actions = errorService.getRecoveryActions(error);
			expect(actions).toEqual(customActions);
		});
	});

	describe('error boundary', () => {
		it('should create error boundary state for critical errors', () => {
			const criticalError = errorService.createError(ErrorType.SYSTEM_CONFIGURATION_ERROR, 'Critical error', {
				severity: ErrorSeverity.CRITICAL
			});

			const boundary = errorService.createErrorBoundary(criticalError);

			expect(boundary.hasError).toBe(true);
			expect(boundary.error).toBe(criticalError);
			expect(boundary.showFallback).toBe(true);
		});

		it('should create error boundary state for non-critical errors', () => {
			const warningError = errorService.createError(ErrorType.API_TIMEOUT, 'Warning error', {
				severity: ErrorSeverity.WARNING
			});

			const boundary = errorService.createErrorBoundary(warningError);

			expect(boundary.hasError).toBe(true);
			expect(boundary.error).toBe(warningError);
			expect(boundary.showFallback).toBe(false);
		});

		it('should create clean state when no error provided', () => {
			const boundary = errorService.createErrorBoundary();

			expect(boundary.hasError).toBe(false);
			expect(boundary.error).toBeUndefined();
			expect(boundary.showFallback).toBe(false);
		});
	});

	describe('configuration', () => {
		it('should use custom error transformer when configured', () => {
			const customTransformer = vi.fn().mockReturnValue({
				type: ErrorType.API_BAD_REQUEST,
				message: 'Custom transformed error',
				severity: ErrorSeverity.INFO,
				domain: ErrorDomain.API,
				displayToUser: true,
				showToast: false,
				reportable: false
			});

			errorService.configure({
				errorTransformer: customTransformer
			});

			const result = errorService.handle('test error');

			expect(customTransformer).toHaveBeenCalledWith('test error');
			expect(result.message).toBe('Custom transformed error');
		});
	});
});
