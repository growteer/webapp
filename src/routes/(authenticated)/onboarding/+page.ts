import { initWeb3Auth } from '$lib/services/w3a/web3auth';
import type { PageLoad } from './$types';

type data = {
	firstName: string;
	lastName: string;
	email: string;
};

export const load: PageLoad = async (): Promise<data> => {
	const web3Auth = await initWeb3Auth();
	const w3aUser = await web3Auth.getUserInfo();

	const data: data = {
		firstName: '',
		lastName: '',
		email: w3aUser?.email ?? ''
	};

	const nameParts = w3aUser?.name?.split(' ');
	if (!nameParts) return data;

	data.lastName = nameParts.pop() ?? '';
	data.firstName = nameParts.join(' ') ?? '';

	return data;
};
