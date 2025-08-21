/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_API_URL } from '$env/static/public';
import {
	getRefreshToken,
	getSessionToken,
	removeSessionToken,
	setRefreshToken,
	setSessionToken
} from '$lib/storage/local';
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	type DefaultContext,
	type MaybeMasked,
	type MutationOptions,
	type OperationVariables,
	type QueryOptions
} from '@apollo/client';
import { ErrorType, type Error } from '../generated/types';
import { refreshSession } from '../mutations/RefreshSession.gql';

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
	TContext extends Record<string, any> = DefaultContext
>(options: MutationOptions<TData, TVariables, TContext>): Promise<MutationResult<TData>> {
	const result = (await client.mutate<TData, TVariables, TContext>({
		errorPolicy: 'all',
		...options
	})) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
		extensions: { [key: string]: any };
	};

	if (!result.errors?.length || result.errors[0].extensions?.type !== ErrorType.Unauthenticated) {
		return result;
	}

	removeSessionToken();
	const oldRefreshToken = getRefreshToken();
	if (!oldRefreshToken) {
		return result;
	}

	const { sessionToken, refreshToken } = await refreshSession(client, oldRefreshToken);
	setSessionToken(sessionToken);
	setRefreshToken(refreshToken);

	return (await client.mutate<TData, TVariables, TContext>({ errorPolicy: 'all', ...options })) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
		extensions: { [key: string]: any };
	};
}

export async function query<TData = any, TVariables extends OperationVariables = OperationVariables>(
	options: QueryOptions<TVariables, TData>
): Promise<{ data: MaybeMasked<TData>; errors: Error[] | undefined }> {
	const result = (await client.query<TData, TVariables>({ errorPolicy: 'all', ...options })) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
	};

	if (!result.errors?.length || result.errors[0].extensions?.type !== ErrorType.Unauthenticated) {
		return result;
	}

	const oldRefreshToken = getRefreshToken();
	if (!oldRefreshToken) {
		return result;
	}

	const { sessionToken, refreshToken } = await refreshSession(client, oldRefreshToken);
	setSessionToken(sessionToken);
	setRefreshToken(refreshToken);

	return (await client.query<TData, TVariables>({ errorPolicy: 'all', ...options })) as {
		data: MaybeMasked<TData>;
		errors: Error[] | undefined;
	};
}
