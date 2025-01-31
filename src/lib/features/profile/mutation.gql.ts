import { mutate } from '$lib/api/client';
import type {
	MutationUpdateProfileArgs,
	ProfileUpdate,
	UpdateUserProfileMutation,
	UserProfile
} from '$lib/api/generated/types';
import { gql } from '@apollo/client';

const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($input: ProfileUpdate!) {
		updateProfile(input: $input) {
			firstname
			lastname
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

export const updateUserProfile = async (input: ProfileUpdate) => {
	const { data, errors } = await mutate<UpdateUserProfileMutation, MutationUpdateProfileArgs>({
		mutation: UPDATE_USER_PROFILE,
		variables: { input }
	});

	if (!data && errors?.length) throw new Error(errors?.[0].extensions?.code ?? 'unknown error');

	return data.updateProfile as UserProfile;
};
