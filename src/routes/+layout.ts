import type { LayoutLoad } from './$types';
import { getSessionToken } from '$lib/storage/local';

export const ssr = false;
export const prerender = false;

type data = {
	isAuthenticated: boolean;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		isAuthenticated: !!getSessionToken()
	};

	return data;
};
