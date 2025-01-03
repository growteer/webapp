import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client';
import { PUBLIC_API_URL } from '$env/static/public';
import { getSessionToken } from '$lib/storage/local';

const getHeaders = () => {
	const sessionToken = getSessionToken();
	return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
};

const auth = new ApolloLink((operation, next) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			...getHeaders()
		}
	}));

	return next(operation);
});

export const client = new ApolloClient({
	uri: PUBLIC_API_URL,
	cache: new InMemoryCache(),
	link: from([auth])
});
