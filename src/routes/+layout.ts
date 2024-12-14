import type { AuthUserInfo } from '@web3auth/auth-adapter';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

type data = {
	isAuthenticated: boolean;
	user: Partial<AuthUserInfo>;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		isAuthenticated: false,
		user: {}
	};

	return data;
};
