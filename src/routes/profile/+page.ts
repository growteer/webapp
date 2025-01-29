import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { queryUserProfile } from './query.gql';

export const load: PageLoad = async ({ parent }) => {
	const { did, isAuthenticated } = await parent();

	if (!isAuthenticated || !did) {
		redirect(302, '/');
	}

	const profile = await queryUserProfile(did);

	return { profile };
};
