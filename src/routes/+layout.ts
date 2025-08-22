import type { LayoutLoad } from './$types';
import { getSessionToken, removeRefreshToken, removeSessionToken } from '$lib/storage/local';
import { appkit } from '$lib/services/wallet/appkit';
import { goto } from '$app/navigation';

export const ssr = false;
export const prerender = false;

type data = {
	isAuthenticated: boolean;
};

export const load: LayoutLoad = async ({ url }) => {
	const data: data = {
		isAuthenticated: !!getSessionToken() && appkit.getIsConnectedState()
	};

	if (!data.isAuthenticated) {
		if (getSessionToken()) {
			removeSessionToken();
			removeRefreshToken();
		}

		if (appkit.getIsConnectedState()) {
			await appkit.disconnect();
		}
	}

	if (!data.isAuthenticated && url.pathname !== '/') {
		return goto('/');
	}

	if (data.isAuthenticated && url.pathname === '/') {
		return goto('/profile');
	}

	return data;
};
