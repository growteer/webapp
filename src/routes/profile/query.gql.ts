import { query } from '$lib/api/client';
import type { QueryUserProfileArgs, UserProfile } from '$lib/api/generated/types';
import { gql } from '@apollo/client';

const USER_PROFILE = gql`
	query UserProfile($userDID: String!) {
		userProfile(userDID: $userDID) {
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

export const queryUserProfile = async (userDID: string) => {
	const { data, errors } = await query<{ userProfile: UserProfile }, QueryUserProfileArgs>({
		query: USER_PROFILE,
		variables: { userDID }
	});

	if (!data && errors?.length) throw new Error(errors?.[0].extensions?.code ?? 'unknown error');

	return data.userProfile;
};
