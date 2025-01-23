/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	ApolloCache,
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	type DefaultContext,
	type MaybeMasked,
	type MutationOptions,
	type OperationVariables
} from '@apollo/client';
import { PUBLIC_API_URL } from '$env/static/public';
import { getRefreshToken, getSessionToken, setRefreshToken, setSessionToken } from '$lib/storage/local';
import { refreshSession } from './tokenRefresh.gql';
import { ErrCode } from './error_codes';
import type { Error } from './generated/types';

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

interface MutationResult<T> {
	data: MaybeMasked<T>;
	errors: Error[] | undefined;
	extensions: { [key: string]: any };
}

export async function mutate<
	TData = any,
	TVariables extends OperationVariables = OperationVariables,
	TContext extends Record<string, any> = DefaultContext,
	TCache extends ApolloCache<any> = ApolloCache<any>
>(options: MutationOptions<TData, TVariables, TContext>): Promise<MutationResult<TData>> {
	let result = (await client.mutate<TData, TVariables, TContext, TCache>({ errorPolicy: 'all', ...options })) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
		extensions: { [key: string]: any };
	};

	if (!result.errors?.length || result.errors[0].extensions?.code !== ErrCode.NotAuthenticated) {
		return result;
	}

	const oldRefreshToken = getRefreshToken();
	if (!oldRefreshToken) {
		return result;
	}

	const { sessionToken, refreshToken } = await refreshSession(client, oldRefreshToken);
	setSessionToken(sessionToken);
	setRefreshToken(refreshToken);

	result = (await client.mutate<TData, TVariables, TContext, TCache>(options)) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
		extensions: { [key: string]: any };
	};

	return result;
}
