import type { UpdatedProfile, Profile } from '$lib/api/generated/types';

export interface FormData {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	primaryEmail: string;
	country: string;
	postalCode?: string;
	city?: string;
	website?: string;
	personalGoal?: string;
	about?: string;
}

export function toUpdatedProfile(data: FormData): UpdatedProfile {
	const { firstName, lastName, dateOfBirth, primaryEmail, country, city, postalCode, website, personalGoal, about } =
		data;

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

export function fromUserProfile(profile: Profile): FormData {
	const { firstName, lastName, dateOfBirth, primaryEmail, location, website, personalGoal, about } = profile;

	const data: FormData = {
		firstName,
		lastName,
		dateOfBirth: new Date(dateOfBirth).toISOString(),
		primaryEmail,
		country: location.country
	};

	if (location.city) data.city = location.city;
	if (location.postalCode) data.postalCode = location.postalCode;
	if (website) data.website = website;
	if (personalGoal) data.personalGoal = personalGoal;
	if (about) data.about = about;

	return data;
}
