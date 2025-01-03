/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ApolloCache,
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	type DefaultContext,
	type FetchResult,
	type MaybeMasked,
	type MutationOptions,
	type OperationVariables
} from '@apollo/client';
import { PUBLIC_API_URL } from '$env/static/public';
import { getRefreshToken, getSessionToken, setRefreshToken, setSessionToken } from '$lib/storage/local';
import { refreshSession } from './tokenRefresh.gql';

const getAuthorizationHeader = () => {
	const sessionToken = getSessionToken();
	return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
};

const auth = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			...getAuthorizationHeader()
		}
	}));

	return forward(operation);
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: ApolloLink.from([auth, new HttpLink({ uri: PUBLIC_API_URL })])
});

export async function mutate<
	TData = any,
	TVariables extends OperationVariables = OperationVariables,
	TContext extends Record<string, any> = DefaultContext,
	TCache extends ApolloCache<any> = ApolloCache<any>
>(options: MutationOptions<TData, TVariables, TContext>): Promise<FetchResult<MaybeMasked<TData>>> {
	const result = await client.mutate<TData, TVariables, TContext, TCache>(options);

	if (!result.errors?.length || result.errors[0].extensions?.code !== 'UNAUTHENTICATED') {
		return result;
	}

	const oldRefreshToken = getRefreshToken();
	if (!oldRefreshToken) {
		return result;
	}

	const { sessionToken, refreshToken } = await refreshSession(client, oldRefreshToken);
	setSessionToken(sessionToken);
	setRefreshToken(refreshToken);

	return client.mutate<TData, TVariables, TContext, TCache>(options);
}
