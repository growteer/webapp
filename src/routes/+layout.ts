import { appKitModal } from '$lib/services/authentication';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

type data = {
	isAuthenticated: boolean;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		isAuthenticated: appKitModal.getIsConnectedState()
	};

	return data;
};
