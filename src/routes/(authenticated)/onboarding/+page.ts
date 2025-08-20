import { appkit } from '$lib/services/wallet/appkit';
import type { PageLoad } from './$types';

type data = {
	email: string;
};

export const load: PageLoad = async (): Promise<data> => {
	const email = appkit.getAccount()?.embeddedWalletInfo?.user?.email;

	const data: data = {
		email: email ?? ''
	};

	return data;
};
