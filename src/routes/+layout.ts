import type { AuthUserInfo } from '@web3auth/auth-adapter';
import type { LayoutLoad } from './$types';
import { initWeb3Auth } from '$lib/services/auth/adapters';

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

	try {
		const web3Auth = await initWeb3Auth();
		data.user = await web3Auth.getUserInfo();
	} catch (err) {
		console.log(err);
	}

	data.isAuthenticated = !!data?.user?.idToken;

	console.log(data);

	return data;
};
