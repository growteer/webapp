import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { queryUserProfile } from './query.gql';
import type { UserProfile } from '$lib/api/generated/types';

export const load: PageLoad = async ({ parent }) => {
	const { did, isAuthenticated } = await parent();

	if (!isAuthenticated || !did) {
		redirect(302, '/');
	}

	const profile = await queryUserProfile(did);
	const dateOnly = new Date(profile.dateOfBirth).toISOString().split('T')[0];

	const sanitizedProfile: UserProfile = {
		...profile,
		location: { ...profile.location },
		dateOfBirth: dateOnly
	};

	return {
		profile: sanitizedProfile
	};
};
