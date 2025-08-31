/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorService, ErrorType, ErrorSeverity, type AppError, type ErrorContext } from '$lib/services/error';
import { ErrorType as GraphQLErrorType } from '../generated/types';
import { mutate as originalMutate, query as originalQuery } from './client';

/**
 * Enhanced API wrapper with comprehensive error handling
 */

interface ApiResult<T> {
	data?: T;
	appError?: AppError;
	success: boolean;
}

/**
 * Transform GraphQL errors to AppErrors
 */
function transformGraphQLError(gqlError: any, context: ErrorContext): AppError {
	const errorType = gqlError.extensions?.type as GraphQLErrorType;

	switch (errorType) {
		case GraphQLErrorType.Unauthenticated:
			return errorService.createError(ErrorType.AUTH_UNAUTHENTICATED, 'Authentication required', {
				context,
				cause: gqlError,
				severity: ErrorSeverity.WARNING,
				displayToUser: true,
				showToast: true
			});

		case GraphQLErrorType.BadRequest:
			return errorService.createError(ErrorType.API_BAD_REQUEST, gqlError.message || 'Invalid request', {
				context,
				cause: gqlError,
				severity: ErrorSeverity.WARNING,
				displayToUser: true,
				showToast: true
			});

		case GraphQLErrorType.InternalServerError:
			return errorService.createError(ErrorType.API_SERVER_ERROR, 'Server error occurred', {
				context,
				cause: gqlError,
				severity: ErrorSeverity.CRITICAL,
				displayToUser: true,
				showToast: true
			});

		default:
			return errorService.createError(ErrorType.API_SERVER_ERROR, gqlError.message || 'API error occurred', {
				context,
				cause: gqlError,
				severity: ErrorSeverity.WARNING,
				displayToUser: true,
				showToast: true
			});
	}
}

/**
 * Enhanced mutation with error handling
 */
export async function enhancedMutate<TData = any, TVariables = any>(
	options: any,
	operationContext?: {
		operationName?: string;
		source?: string;
	}
): Promise<ApiResult<TData>> {
	const context: ErrorContext = {
		source: operationContext?.source || 'API',
		operation: operationContext?.operationName || 'mutation',
		timestamp: new Date()
	};

	try {
		const result = await originalMutate(options);

		// Handle GraphQL errors
		if (result.errors?.length) {
			const appError = transformGraphQLError(result.errors[0], context);
			return {
				data: result.data,
				appError,
				success: false
			};
		}

		return {
			data: result.data,
			success: true
		};
	} catch (error) {
		// Handle Apollo errors and unexpected errors
		const appError = errorService.handle(error, context);
		return {
			appError,
			success: false
		};
	}
}

/**
 * Enhanced query with error handling
 */
export async function enhancedQuery<TData = any, TVariables = any>(
	options: any,
	operationContext?: {
		operationName?: string;
		source?: string;
	}
): Promise<ApiResult<TData>> {
	const context: ErrorContext = {
		source: operationContext?.source || 'API',
		operation: operationContext?.operationName || 'query',
		timestamp: new Date()
	};

	try {
		const result = await originalQuery(options);

		// Handle GraphQL errors
		if (result.errors?.length) {
			const appError = transformGraphQLError(result.errors[0], context);
			return {
				data: result.data,
				appError,
				success: false
			};
		}

		return {
			data: result.data,
			success: true
		};
	} catch (error) {
		// Handle Apollo errors and unexpected errors
		const appError = errorService.handle(error, context);
		return {
			appError,
			success: false
		};
	}
}
