import { describe, it, expect } from 'vitest';
import { toUpdatedProfile } from './schema';
import type { Profile } from '$lib/api/generated/types';

describe('ProfileForm Schema', () => {
	const minimalProfile: Profile = {
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-01-01',
		primaryEmail: 'test@example.com',
		location: {
			country: 'USA'
		}
	};

	it('should convert a minimal Profile to UpdatedProfile', () => {
		const result = toUpdatedProfile(minimalProfile);

		expect(result).toEqual({
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'test@example.com',
			country: 'USA'
		});
	});

	it('should include optional fields when present', () => {
		const fullProfile: Profile = {
			...minimalProfile,
			location: {
				country: 'USA',
				city: 'New York',
				postalCode: '10001'
			},
			website: 'https://example.com',
			personalGoal: 'Learn Svelte',
			about: 'Software developer'
		};

		const result = toUpdatedProfile(fullProfile);

		expect(result).toEqual({
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'test@example.com',
			country: 'USA',
			city: 'New York',
			postalCode: '10001',
			website: 'https://example.com',
			personalGoal: 'Learn Svelte',
			about: 'Software developer'
		});
	});

	it('should format date correctly', () => {
		const profileWithDate: Profile = {
			...minimalProfile,
			dateOfBirth: '1990-12-25T00:00:00.000Z'
		};

		const result = toUpdatedProfile(profileWithDate);

		expect(result.dateOfBirth).toBe('1990-12-25');
	});
});
