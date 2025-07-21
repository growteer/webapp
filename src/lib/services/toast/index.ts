import { createToaster } from '@skeletonlabs/skeleton-svelte';

const toaster = createToaster();

export const getToaster = () => toaster;

export const toastError = (message: string) => {
	toaster.error({ description: message });
};

export const toastSuccess = (message: string) => {
	toaster.success({ description: message });
};

export const toastWarning = (message: string) => {
	toaster.warning({ description: message });
};
