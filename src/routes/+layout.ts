import type { LayoutLoad } from './$types';
import { getSessionToken } from '$lib/storage/local';
import { redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

type data = {
	isAuthenticated: boolean;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		isAuthenticated: !!getSessionToken()
	};

	if (!data.isAuthenticated && location.pathname !== '/') {
		redirect(302, '/');
	}

	return data;
};
