import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PUBLIC_API_URL } from '$env/static/public';

export const client = new ApolloClient({
	uri: PUBLIC_API_URL,
	cache: new InMemoryCache()
});
