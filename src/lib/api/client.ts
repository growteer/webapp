import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { PUBLIC_API_URL } from '$env/static/public';
import { getSessionToken } from '$lib/storage/local';

const getHeaders = () => {
	const sessionToken = getSessionToken();
	return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
};

const auth = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			...getHeaders()
		}
	}));

	return forward(operation);
});

export const client = new ApolloClient({
	uri: PUBLIC_API_URL,
	cache: new InMemoryCache(),
	link: ApolloLink.from([new HttpLink({ uri: PUBLIC_API_URL }), auth])
});
