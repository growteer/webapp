import type { PageLoad } from './$types';
import { queryProfile } from '$lib/api/queries/UserProfile.gql';
import type { Profile } from '$lib/api/generated/types';

export const load: PageLoad = async ({ parent }) => {
	const { did } = await parent();

	const profile = await queryProfile(did ?? ''); //TODO: workaround, should centralize did validation
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
