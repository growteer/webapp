import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Navbar from './Navbar.svelte';

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
		render(Navbar, {
			props: {
				name: 'Jane Doe',
				title: 'Duke of York'
			}
		});

		expect(screen.getByTitle(/signout/i)).toBeInTheDocument();
		expect(screen.getByText('Jane Doe')).toBeInTheDocument();
		expect(screen.getByText('Duke of York')).toBeInTheDocument();
	});
});
