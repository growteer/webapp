import type { AuthUserInfo } from '@web3auth/auth-adapter';
import type { LayoutLoad } from './$types';
import { initWeb3Auth } from '$lib/services/w3a/web3auth';
import { getSessionToken } from '$lib/storage/local';
import { createSolanaClient } from '$lib/services/solana/client';

export const ssr = false;
export const prerender = false;

type data = {
	isAuthenticated: boolean;
	did?: string;
	user?: Partial<AuthUserInfo>;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		isAuthenticated: !!getSessionToken()
	};

	try {
		const web3Auth = await initWeb3Auth();
		const solClient = await createSolanaClient();
		data.user = await web3Auth.getUserInfo();
		data.did = await solClient.getDIDPKH();
	} catch (err) {
		console.log(err);
	}

	return data;
};
