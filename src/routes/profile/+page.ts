import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { queryProfile } from './query.gql';
import type { Profile } from '$lib/api/generated/types';

export const load: PageLoad = async ({ parent }) => {
	const { did, isAuthenticated } = await parent();

	if (!isAuthenticated || !did) {
		redirect(302, '/');
	}

	const profile = await queryProfile(did);
	const dateOnly = new Date(profile.dateOfBirth).toISOString().split('T')[0];

	const sanitizedProfile: Profile = {
		...profile,
		location: { ...profile.location },
		dateOfBirth: dateOnly
	};

	return {
		profile: sanitizedProfile
	};
};
