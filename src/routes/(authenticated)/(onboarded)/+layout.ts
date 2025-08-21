import type { LayoutLoad } from './$types';
import { toastError } from '$lib/services/toast';
import { queryProfile } from '$lib/api/queries/UserProfile.gql';

type data = {
	name: string;
	title: string;
};

export const load: LayoutLoad = async ({ parent }) => {
	const data: data = {
		name: '',
		title: ''
	};

	const { did } = await parent();
	try {
		const profile = await queryProfile(did ?? '');

		data.name = profile.firstName + ' ' + profile.lastName;
		data.title = profile.location.city ?? ''; //TODO: adapt once API includes title
	} catch (err) {
		toastError(String(err));
	}

	return data;
};
