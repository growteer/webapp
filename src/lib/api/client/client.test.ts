import * as local from '$lib/storage/local';
import { gql } from '@apollo/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('$lib/storage/local');
vi.mock('$env/static/public', () => ({
	PUBLIC_API_URL: '/graphql'
}));

// Import the module to be tested *after* all mocks are set up
import { mutate, query } from './client';
import { ErrorType } from '../generated/types';

const TEST_MUTATION = gql`
	mutation TestMutationWithAuth($input: String!) {
		testMutationWithAuth(input: $input) {
			success
			output
		}
	}
`;

const TEST_MUTATION_NO_AUTH = gql`
	mutation TestMutationNoAuth($input: String!) {
		testMutationNoAuth(input: $input) {
			success
			output
		}
	}
`;

const TEST_QUERY = gql`
	query TestQueryWithAuth {
		testQuery {
			success
		}
	}
`;

const TEST_QUERY_NO_AUTH = gql`
	query TestQueryNoAuth {
		testQuery {
			success
		}
	}
`;

describe('api client', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('mutate', () => {
		it('should perform mutation and return result on success', async () => {
			const result = await mutate({
				mutation: TEST_MUTATION_NO_AUTH,
				variables: { input: 'test' }
			});

			expect(result.data).toEqual({
				success: true,
				output: 'test'
			});

			expect(result.errors).toBeUndefined();
		});

		it('should refresh token and retry on authentication error', async () => {
			vi.mocked(local.getRefreshToken).mockReturnValue('old-refresh-token');
			vi.mocked(local.getSessionToken).mockReturnValue('valid-session-token');
			vi.mocked(local.getSessionToken).mockReturnValueOnce('expired-session-token');

			const result = await mutate({
				mutation: TEST_MUTATION,
				variables: { input: 'test' }
			});

			expect(result.data).toEqual({
				success: true,
				output: 'test'
			});
		});

		it('should return error if no refresh token is available', async () => {
			vi.mocked(local.getSessionToken).mockReturnValue('expired-session-token');
			vi.mocked(local.getRefreshToken).mockReturnValue(null);

			const result = await mutate({
				mutation: TEST_MUTATION,
				variables: { input: 'test' }
			});

			expect(result.errors).toHaveLength(1);
			expect(result.errors?.[0]).toMatchObject({
				extensions: {
					type: ErrorType.Unauthenticated
				}
			});
			expect(local.setRefreshToken).not.toHaveBeenCalled();
		});
	});

	describe('query', () => {
		it('should perform query and return result on success', async () => {
			const result = await query({
				query: TEST_QUERY_NO_AUTH
			});

			expect(result.data).toEqual({
				success: true
			});
			expect(result.errors).toBeUndefined();
		});

		it('should refresh token and retry on authentication error', async () => {
			vi.mocked(local.getRefreshToken).mockReturnValue('old-refresh-token');
			vi.mocked(local.getSessionToken).mockReturnValue('valid-session-token');
			vi.mocked(local.getSessionToken).mockReturnValueOnce('expired-session-token');

			const result = await query({
				query: TEST_QUERY
			});

			expect(result.errors).toBeUndefined();
			expect(result.data.success).toBe(true);
		});

		it('should return error if no refresh token is available on auth error', async () => {
			vi.mocked(local.getRefreshToken).mockReturnValue(null);
			vi.mocked(local.getSessionToken).mockReturnValue('expired-session-token');

			const result = await query({
				query: TEST_QUERY
			});

			expect(result.errors).toHaveLength(1);
			expect(result.errors?.[0]).toMatchObject({
				message: 'Unauthenticated'
			});
			expect(local.setRefreshToken).not.toHaveBeenCalled();
		});
	});
});
