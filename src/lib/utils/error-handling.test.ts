import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withErrorHandling, handleApiCall, createValidationError, handleComponentError } from './error-handling';
import { ErrorType, ErrorSeverity } from '../services/error/types';

// Mock the error service
const mockErrorService = {
	handle: vi.fn(),
	handleAsync: vi.fn(),
	createError: vi.fn()
};

vi.mock('../services/error/index', () => ({
	errorService: mockErrorService,
	handleError: vi.fn(),
	ErrorType,
	ErrorSeverity
}));

vi.mock('svelte-i18n', () => ({
	_: { subscribe: vi.fn(), set: vi.fn() },
	get: vi.fn(() => (key: string) => key)
}));

describe('Error Handling Utilities', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		// Setup mock implementations
		mockErrorService.handleAsync.mockImplementation(async (operation, context) => {
			try {
				const data = await operation();
				return { data };
			} catch (error) {
				return { error: { type: 'system.unknown_error', message: 'Test error' } };
			}
		});
	});

	describe('withErrorHandling', () => {
		it('should return data on successful operation', async () => {
			const testData = { result: 'success' };
			const operation = vi.fn().mockResolvedValue(testData);

			const result = await withErrorHandling(operation, {
				source: 'TestComponent'
			});

			expect(result).toEqual(testData);
		});

		it('should return fallback value on error', async () => {
			const testError = new Error('Test error');
			const operation = vi.fn().mockRejectedValue(testError);
			const fallbackValue = { fallback: true };
			const onError = vi.fn();

			const result = await withErrorHandling(operation, {
				source: 'TestComponent',
				fallbackValue,
				onError
			});

			expect(result).toEqual(fallbackValue);
			expect(onError).toHaveBeenCalled();
		});
	});

	describe('handleApiCall', () => {
		beforeEach(() => {
			mockErrorService.handleAsync.mockImplementation(async (operation, context) => {
				try {
					const data = await operation();
					return { data };
				} catch (error) {
					return {
						error: {
							type: 'api.server_error',
							message: 'API error',
							severity: 'warning'
						}
					};
				}
			});
		});

		it('should succeed on first attempt', async () => {
			const testData = { success: true };
			const apiCall = vi.fn().mockResolvedValue(testData);

			const result = await handleApiCall(apiCall, { context: 'TestAPI' });

			expect(result.data).toEqual(testData);
			expect(result.error).toBeUndefined();
			expect(apiCall).toHaveBeenCalledTimes(1);
		});

		it('should retry on failure and succeed', async () => {
			const testData = { success: true };
			const apiCall = vi.fn().mockRejectedValueOnce(new Error('First failure')).mockResolvedValueOnce(testData);

			const result = await handleApiCall(apiCall, {
				maxRetries: 1,
				retryDelay: 10,
				context: 'TestAPI'
			});

			expect(result.data).toEqual(testData);
			expect(result.error).toBeUndefined();
			expect(apiCall).toHaveBeenCalledTimes(2);
		});

		it('should return error after max retries', async () => {
			const testError = new Error('Persistent failure');
			const apiCall = vi.fn().mockRejectedValue(testError);

			const result = await handleApiCall(apiCall, {
				maxRetries: 2,
				retryDelay: 10,
				context: 'TestAPI'
			});

			expect(result.data).toBeUndefined();
			expect(result.error).toBeDefined();
			expect(apiCall).toHaveBeenCalledTimes(3); // 1 + 2 retries
		});
	});

	describe('createValidationError', () => {
		it('should create validation error with correct type', () => {
			mockErrorService.createError.mockReturnValue({
				type: ErrorType.VALIDATION_REQUIRED_FIELD,
				message: 'Field is required',
				severity: ErrorSeverity.WARNING
			});

			createValidationError('email', 'required', 'Custom message');

			expect(mockErrorService.createError).toHaveBeenCalledWith(
				ErrorType.VALIDATION_REQUIRED_FIELD,
				'Custom message',
				expect.objectContaining({
					context: expect.objectContaining({
						source: 'Validation',
						operation: 'validate',
						metadata: { field: 'email', validationType: 'required' }
					}),
					showToast: false,
					reportable: false
				})
			);
		});
	});

	describe('handleComponentError', () => {
		it('should handle component error with context', () => {
			const testError = new Error('Component error');

			handleComponentError(testError, 'TestComponent', 'render');

			expect(mockErrorService.handle).toHaveBeenCalledWith(
				testError,
				expect.objectContaining({
					source: 'Component:TestComponent',
					operation: 'render',
					timestamp: expect.any(Date)
				})
			);
		});

		it('should default operation to render', () => {
			const testError = new Error('Component error');

			handleComponentError(testError, 'TestComponent');

			expect(mockErrorService.handle).toHaveBeenCalledWith(
				testError,
				expect.objectContaining({
					source: 'Component:TestComponent',
					operation: 'render'
				})
			);
		});
	});
});
