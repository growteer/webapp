import type { UpdatedProfile, Profile } from '$lib/api/generated/types';

export function toUpdatedProfile(input: Profile): UpdatedProfile {
	const { firstName, lastName, dateOfBirth, primaryEmail, location, website, personalGoal, about } = input;
	const { country, city, postalCode } = location;

	const profile: UpdatedProfile = {
		firstName,
		lastName,
		dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0],
		primaryEmail,
		country
	};

	if (city) profile.city = city;
	if (postalCode) profile.postalCode = postalCode;
	if (website) profile.website = website;
	if (personalGoal) profile.personalGoal = personalGoal;
	if (about) profile.about = about;

	return profile;
}
