import { getWeb3Auth, initAuth } from '$lib/services/authentication';
import type { AuthUserInfo } from '@web3auth/auth-adapter';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

type data = {
	isAuthenticated: boolean;
	user: Partial<AuthUserInfo>;
};

export const load: LayoutLoad = async () => {
	await initAuth();

	const data: data = {
		isAuthenticated: false,
		user: {}
	};

	try {
		data.user = await getWeb3Auth().getUserInfo();
	} catch (e) {
		console.log(e);
	}

	data.isAuthenticated = !!data.user.idToken;

	return data;
};
