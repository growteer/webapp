import { query } from '$lib/api/client';
import type { Profile, QueryProfileArgs } from '$lib/api/generated/types';
import { gql } from '@apollo/client';

const USER_PROFILE = gql`
	query Profile($userDID: String!) {
		profile(userDID: $userDID) {
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

export const queryProfile = async (userDID: string) => {
	const { data, errors } = await query<{ profile: Profile }, QueryProfileArgs>({
		query: USER_PROFILE,
		variables: { userDID }
	});

	if (!data && errors?.length) throw new Error(errors?.[0].extensions?.code ?? 'unknown error');

	return data.profile;
};
