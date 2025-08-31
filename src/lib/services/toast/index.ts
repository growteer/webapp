import { createToaster } from '@skeletonlabs/skeleton-svelte';
import type { AppError, RecoveryAction } from '../error/types';

const toaster = createToaster();

export const getToaster = () => toaster;

/**
 * Enhanced toast service with error context and recovery actions
 */

export const toastError = (
	message: string,
	options?: {
		duration?: number;
		actions?: RecoveryAction[];
		dismissible?: boolean;
	}
) => {
	toaster.error({
		description: message,
		closable: options?.dismissible ?? true
	});
};

export const toastSuccess = (
	message: string,
	options?: {
		duration?: number;
		dismissible?: boolean;
	}
) => {
	toaster.success({
		description: message,
		closable: options?.dismissible ?? true
	});
};

export const toastWarning = (
	message: string,
	options?: {
		duration?: number;
		dismissible?: boolean;
	}
) => {
	toaster.warning({
		description: message,
		closable: options?.dismissible ?? true
	});
};

/**
 * Display toast notification from AppError with appropriate styling and actions
 */
export const toastFromError = (error: AppError) => {
	const message = error.message;

	switch (error.severity) {
		case 'critical':
			toastError(message, { dismissible: true });
			break;
		case 'warning':
			toastWarning(message, { dismissible: true });
			break;
		case 'info':
			toastSuccess(message, { dismissible: true });
			break;
	}
};
