import { SolanaClient } from '$lib/services/solana/client';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';
import { appkit } from '$lib/services/wallet/appkit';
import type { Provider } from '@reown/appkit-adapter-solana';

type data = {
	did: string;
};

export const load: LayoutLoad = async ({ parent }) => {
	const { isAuthenticated } = await parent();
	if (!isAuthenticated) {
		return goto('/');
	}

	const provider = appkit.getProvider('solana');
	const solClient = new SolanaClient(provider as Provider);

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
