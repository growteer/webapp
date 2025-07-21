import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
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

	it('renders login button when user is not authenticated', () => {
		vi.spyOn(contexts, 'getIsAuthenticatedContext').mockReturnValue(writable(false));

		render(Navbar);

		expect(screen.getByTitle(/login/i)).toBeInTheDocument();
		expect(screen.queryByText('Profile')).not.toBeInTheDocument();
		expect(screen.queryByTitle(/logout/i)).not.toBeInTheDocument();
	});

	it('renders logout button and profile link when user is authenticated', () => {
		vi.spyOn(contexts, 'getIsAuthenticatedContext').mockReturnValue(writable(true));

		render(Navbar);

		expect(screen.getByTitle(/logout/i)).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
		expect(screen.queryByTitle(/login/i)).not.toBeInTheDocument();
	});
});
