import { ApolloClient, gql, type NormalizedCacheObject } from '@apollo/client';
import type { RefreshInput, RefreshMutation } from '../generated/types';

const REFRESH_SESSION = gql`
	mutation Refresh($refreshToken: String!) {
		refreshSession(input: { refreshToken: $refreshToken }) {
			sessionToken
			refreshToken
		}
	}
`;

export const refreshSession = async (client: ApolloClient<NormalizedCacheObject>, refreshToken: string) => {
	const { data, errors } = await client.mutate<RefreshMutation, RefreshInput>({
		mutation: REFRESH_SESSION,
		variables: { refreshToken }
	});

	if (errors?.length) throw new Error(errors[0].message);
	if (!data || !data.refreshSession?.sessionToken) throw new Error('could not refresh the session');

	return data.refreshSession;
};
