/**
 * Comprehensive error classification system for the application
 */

/**
 * Error domains represent different areas of the application
 */
export enum ErrorDomain {
	// Authentication and authorization
	AUTH = 'auth',
	// API and network operations
	API = 'api',
	// Wallet and blockchain operations
	WALLET = 'wallet',
	// User interface and interactions
	UI = 'ui',
	// Data validation and processing
	VALIDATION = 'validation',
	// External services integration
	EXTERNAL = 'external',
	// Application state and storage
	STORAGE = 'storage',
	// Unknown or system errors
	SYSTEM = 'system'
}

/**
 * Error severity levels determine how errors are handled and displayed
 */
export enum ErrorSeverity {
	/** Critical errors that prevent application functionality */
	CRITICAL = 'critical',
	/** Warnings that may affect user experience but don't break functionality */
	WARNING = 'warning',
	/** Informational messages for user awareness */
	INFO = 'info'
}

/**
 * Specific error types within each domain
 */
export enum ErrorType {
	// Auth domain errors
	AUTH_UNAUTHENTICATED = 'auth.unauthenticated',
	AUTH_UNAUTHORIZED = 'auth.unauthorized',
	AUTH_SESSION_EXPIRED = 'auth.session_expired',
	AUTH_INVALID_CREDENTIALS = 'auth.invalid_credentials',
	AUTH_MISSING_DID = 'auth.missing_did',

	// API domain errors
	API_NETWORK_ERROR = 'api.network_error',
	API_TIMEOUT = 'api.timeout',
	API_BAD_REQUEST = 'api.bad_request',
	API_SERVER_ERROR = 'api.server_error',
	API_NOT_FOUND = 'api.not_found',
	API_RATE_LIMITED = 'api.rate_limited',

	// Wallet domain errors
	WALLET_CONNECTION_FAILED = 'wallet.connection_failed',
	WALLET_TRANSACTION_FAILED = 'wallet.transaction_failed',
	WALLET_INSUFFICIENT_FUNDS = 'wallet.insufficient_funds',
	WALLET_NETWORK_MISMATCH = 'wallet.network_mismatch',
	WALLET_USER_REJECTED = 'wallet.user_rejected',

	// UI domain errors
	UI_COMPONENT_ERROR = 'ui.component_error',
	UI_NAVIGATION_ERROR = 'ui.navigation_error',
	UI_FORM_SUBMISSION_ERROR = 'ui.form_submission_error',

	// Validation domain errors
	VALIDATION_REQUIRED_FIELD = 'validation.required_field',
	VALIDATION_INVALID_FORMAT = 'validation.invalid_format',
	VALIDATION_OUT_OF_RANGE = 'validation.out_of_range',

	// External service errors
	EXTERNAL_SERVICE_UNAVAILABLE = 'external.service_unavailable',
	EXTERNAL_API_ERROR = 'external.api_error',

	// Storage domain errors
	STORAGE_QUOTA_EXCEEDED = 'storage.quota_exceeded',
	STORAGE_ACCESS_DENIED = 'storage.access_denied',
	STORAGE_CORRUPTION = 'storage.corruption',

	// System domain errors
	SYSTEM_UNKNOWN_ERROR = 'system.unknown_error',
	SYSTEM_CONFIGURATION_ERROR = 'system.configuration_error'
}

/**
 * Error context provides additional information about where and when the error occurred
 */
export interface ErrorContext {
	/** The component or service where the error occurred */
	source?: string;
	/** The specific operation that failed */
	operation?: string;
	/** Additional metadata about the error */
	metadata?: Record<string, unknown>;
	/** Timestamp when the error occurred */
	timestamp?: Date;
	/** User ID if available */
	userId?: string;
	/** Request ID for API errors */
	requestId?: string;
}

/**
 * Recovery actions that can be suggested to the user
 */
export enum RecoveryAction {
	RETRY = 'retry',
	REFRESH = 'refresh',
	NAVIGATE_HOME = 'navigate_home',
	CONTACT_SUPPORT = 'contact_support',
	CHECK_NETWORK = 'check_network',
	UPDATE_BROWSER = 'update_browser',
	CLEAR_CACHE = 'clear_cache'
}

/**
 * Comprehensive error information structure
 */
export interface AppError {
	/** Unique error type identifier */
	type: ErrorType;
	/** Human-readable error message (can be i18n key) */
	message: string;
	/** Error severity level */
	severity: ErrorSeverity;
	/** Error domain classification */
	domain: ErrorDomain;
	/** Additional context about the error */
	context?: ErrorContext;
	/** Original error object if available */
	cause?: Error | unknown;
	/** Whether this error should be displayed to the user */
	displayToUser: boolean;
	/** Whether this error should trigger a toast notification */
	showToast: boolean;
	/** Suggested recovery actions */
	recoveryActions?: RecoveryAction[];
	/** Whether the error should be reported to error tracking service */
	reportable: boolean;
}

/**
 * Error handler configuration
 */
export interface ErrorHandlerConfig {
	/** Whether to show toast notifications for errors */
	enableToasts: boolean;
	/** Whether to log errors to console */
	enableConsoleLogging: boolean;
	/** Whether to report errors to external service */
	enableErrorReporting: boolean;
	/** Custom error transformation function */
	errorTransformer?: (error: unknown) => AppError;
}

/**
 * Error boundary state for components
 */
export interface ErrorBoundaryState {
	/** Whether an error has occurred */
	hasError: boolean;
	/** The error that occurred */
	error?: AppError;
	/** Whether to show a fallback UI */
	showFallback: boolean;
	/** Custom fallback message */
	fallbackMessage?: string;
}
