import { createSolanaClient } from '$lib/services/solana/client';
import { initWeb3Auth } from '$lib/services/w3a/web3auth';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';

type data = {
	did: string;
};

export const load: LayoutLoad = async ({ parent }) => {
	const { isAuthenticated } = await parent();
	if (!isAuthenticated) {
		return goto('/');
	}

	const web3Auth = await initWeb3Auth();
	const solClient = await createSolanaClient(web3Auth);

	const data: data = {
		did: ''
	};

	try {
		data.did = await solClient.getDIDPKH();
	} catch (err) {
		console.log(err);
	}

	return data;
};
