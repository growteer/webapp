import { graphql, HttpResponse } from 'msw';
import { ErrorType } from '../lib/api/generated/types';

export const genericHandlers = [
	graphql.query('TestQueryNoAuth', () => {
		return HttpResponse.json({
			data: {
				success: true
			}
		});
	}),

	graphql.query('TestQueryWithAuth', ({ request }) => {
		const authorization = request.headers.get('Authorization');

		if (!authorization || authorization !== 'Bearer valid-session-token') {
			return HttpResponse.json({
				errors: [
					{
						message: 'Unauthenticated',
						extensions: {
							type: ErrorType.Unauthenticated
						}
					}
				]
			});
		}

		return HttpResponse.json({
			data: {
				success: true
			}
		});
	}),

	graphql.mutation('TestMutationNoAuth', ({ variables }) => {
		return HttpResponse.json({
			data: {
				success: true,
				output: variables.input
			}
		});
	}),

	graphql.mutation('TestMutationWithAuth', ({ request, variables }) => {
		const authorization = request.headers.get('Authorization');

		if (!authorization || authorization !== 'Bearer valid-session-token') {
			return HttpResponse.json({
				errors: [
					{
						extensions: {
							type: ErrorType.Unauthenticated
						}
					}
				]
			});
		}

		return HttpResponse.json({
			data: {
				success: true,
				output: variables.input
			}
		});
	}),

	graphql.mutation('Refresh', ({ variables }) => {
		if (!variables.refreshToken) {
			return HttpResponse.json({
				errors: [
					{
						message: 'Refresh token is required',
						extensions: {
							type: ErrorType.BadRequest
						}
					}
				]
			});
		}

		if (variables.refreshToken === 'invalid-token') {
			return HttpResponse.json({
				errors: [
					{
						message: 'Invalid refresh token',
						extensions: {
							type: ErrorType.Unauthenticated
						}
					}
				]
			});
		}

		return HttpResponse.json({
			data: {
				refreshSession: {
					sessionToken: 'valid-session-token',
					refreshToken: 'new-refresh-token'
				}
			}
		});
	})
];
