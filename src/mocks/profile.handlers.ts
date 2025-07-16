import { graphql, HttpResponse } from 'msw';

export const profileHandlers = [
	graphql.mutation('UpdateUserProfile', () => {
		return HttpResponse.json({});
	})
];
