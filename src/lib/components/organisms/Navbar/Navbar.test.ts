import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { writable } from 'svelte/store';
import Navbar from './Navbar.svelte';
import * as contexts from '$lib/contexts';

describe('Navbar', () => {
	beforeAll(() => {
		vi.mock('$lib/services/authn/client', () => {
			return {
				AuthClient: vi.fn().mockImplementation(() => {
					return {
						login: vi.fn().mockResolvedValue(true),
						logout: vi.fn().mockResolvedValue(undefined)
					};
				})
			};
		});
	});

	afterAll(() => {
		vi.clearAllMocks();
	});

	it('renders logout button and profile link when user is authenticated', () => {
		vi.spyOn(contexts, 'getIsAuthenticatedContext').mockReturnValue(writable(true));

		render(Navbar);

		expect(screen.getByTitle(/logout/i)).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
		expect(screen.queryByTitle(/login/i)).not.toBeInTheDocument();
	});
});
