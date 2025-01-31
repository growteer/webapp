import type { ProfileUpdate, UserProfile } from '$lib/api/generated/types';

export interface FormData {
	firstname: string;
	lastname: string;
	dateOfBirth: string;
	primaryEmail: string;
	country: string;
	postalCode?: string;
	city?: string;
	website?: string;
	personalGoal?: string;
	about?: string;
}

export function toProfileUpdate(data: FormData): ProfileUpdate {
	const { firstname, lastname, dateOfBirth, primaryEmail, country, city, postalCode, website, personalGoal, about } =
		data;

	const profile: ProfileUpdate = {
		firstname,
		lastname,
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

export function fromUserProfile(profile: UserProfile): FormData {
	const { firstname, lastname, dateOfBirth, primaryEmail, location, website, personalGoal, about } = profile;

	const data: FormData = {
		firstname,
		lastname,
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
