import type { Profile, UpdateUserProfileMutationVariables } from '$lib/api/generated/types';
import { graphql, HttpResponse } from 'msw';

export const profileHandlers = [
	graphql.mutation<Profile, UpdateUserProfileMutationVariables>('UpdateUserProfile', async ({ variables }) => {
		if (variables.profile.firstName === 'delayed') {
			await new Promise((resolve) => setTimeout(resolve, 200));
			return HttpResponse.json({});
		}

		return HttpResponse.json({});
	})
];
