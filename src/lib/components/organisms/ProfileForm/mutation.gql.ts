import { mutate } from '$lib/api/client';
import type {
	MutationUpdateProfileArgs,
	UpdatedProfile,
	UpdateUserProfileMutation,
	Profile
} from '$lib/api/generated/types';
import { gql } from '@apollo/client';

const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($profile: UpdatedProfile!) {
		updateProfile(profile: $profile) {
			firstName
			lastName
			dateOfBirth
			primaryEmail
			location {
				country
				postalCode
				city
			}
			website
			personalGoal
			about
		}
	}
`;

export const updateUserProfile = async (profile: UpdatedProfile) => {
	const { data, errors } = await mutate<UpdateUserProfileMutation, MutationUpdateProfileArgs>({
		mutation: UPDATE_USER_PROFILE,
		variables: { profile }
	});

	if (!data && errors?.length) throw new Error(errors?.[0].extensions?.code ?? 'unknown error');

	return data.updateProfile as Profile;
};
