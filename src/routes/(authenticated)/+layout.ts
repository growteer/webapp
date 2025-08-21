import { SolanaClient } from '$lib/services/solana/client';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';
import { appkit } from '$lib/services/wallet/appkit';
import type { Provider } from '@reown/appkit-adapter-solana';
import { AuthClient } from '$lib/services/authn/client';
import { toastError } from '$lib/services/toast';

type data = {
	did: string;
};

export const load: LayoutLoad = async () => {
	const data: data = {
		did: ''
	};

	const provider = appkit.getProvider('solana');
	const solClient = new SolanaClient(provider as Provider);

	try {
		data.did = await solClient.getDIDPKH();
		return data;
	} catch (err) {
		toastError(String(err));

		const auth = new AuthClient();
		await auth.logout();

		await goto('/');
	}
};
