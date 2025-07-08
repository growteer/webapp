import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import OnboardingForm from './OnboardingForm.svelte';
import type { FormData } from './schema';
import { goto } from '$app/navigation';
import { onboard } from '$lib/services/authn/mutations.gql';
import { web3Auth } from '$lib/services/w3a/web3auth';
import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
import { toastError } from '$lib/features/toast';

describe('OnboardingForm', () => {
	let mockFormData: FormData;
	let user: ReturnType<typeof userEvent.setup>;

	beforeAll(() => {
		vi.mock('$app/navigation', () => ({
			goto: vi.fn()
		}));

		vi.mock('$lib/services/authn/mutations.gql', () => ({
			onboard: vi.fn()
		}));

		vi.mock('$lib/services/w3a/web3auth', () => ({
			web3Auth: {
				logout: vi.fn()
			}
		}));

		vi.mock('$lib/storage/local', () => ({
			removeRefreshToken: vi.fn(),
			removeSessionToken: vi.fn()
		}));

		vi.mock('$lib/features/toast', () => ({
			toastError: vi.fn()
		}));

		user = userEvent.setup();
		mockFormData = {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			primaryEmail: '',
			country: '',
			city: '',
			postalCode: '',
			website: ''
		};

		Object.defineProperty(window, 'location', {
			value: { href: '' },
			writable: true
		});
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	it('renders all form fields', () => {
		render(OnboardingForm, { formData: mockFormData });

		expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
	});

	it('renders sign up and cancel buttons', () => {
		render(OnboardingForm, { formData: mockFormData });

		expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
	});

	it('updates form data when user types in fields', async () => {
		render(OnboardingForm, { formData: mockFormData });

		const firstNameInput = screen.getByLabelText(/first name/i);
		await user.type(firstNameInput, 'John');

		// Check that the value appears in the input field
		expect(firstNameInput).toHaveValue('John');
	});

	it('submits form with correct data on successful submission', async () => {
		const completeFormData = {
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'john@example.com',
			country: 'USA',
			city: 'New York',
			postalCode: '10001',
			website: 'https://johndoe.com'
		};

		vi.mocked(onboard).mockResolvedValue({ firstName: 'John', lastName: 'Doe' });
		vi.mocked(goto).mockResolvedValue(undefined);

		render(OnboardingForm, { formData: completeFormData });

		const submitButton = screen.getByRole('button', { name: /sign up/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(onboard).toHaveBeenCalledWith({
				firstName: 'John',
				lastName: 'Doe',
				dateOfBirth: '1990-01-01',
				primaryEmail: 'john@example.com',
				country: 'USA',
				city: 'New York',
				postalCode: '10001',
				website: 'https://johndoe.com'
			});
		});

		expect(goto).toHaveBeenCalledWith('/');
	});

	it('submits form with only required fields', async () => {
		const minimalFormData = {
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'john@example.com',
			country: 'USA',
			city: '',
			postalCode: '',
			website: ''
		};

		vi.mocked(onboard).mockResolvedValue({ firstName: 'John', lastName: 'Doe' });

		render(OnboardingForm, { formData: minimalFormData });

		const submitButton = screen.getByRole('button', { name: /sign up/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(onboard).toHaveBeenCalledWith({
				firstName: 'John',
				lastName: 'Doe',
				dateOfBirth: '1990-01-01',
				primaryEmail: 'john@example.com',
				country: 'USA'
			});
		});
	});

	it('handles submission error and shows toast', async () => {
		const formDataWithRequiredFields = {
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'john@example.com',
			country: 'USA',
			city: '',
			postalCode: '',
			website: ''
		};

		const errorMessage = 'Submission failed';
		vi.mocked(onboard).mockRejectedValue(new Error(errorMessage));

		render(OnboardingForm, { formData: formDataWithRequiredFields });

		const submitButton = screen.getByRole('button', { name: /sign up/i });
		await user.click(submitButton);

		await waitFor(() => {
			expect(toastError).toHaveBeenCalledWith(`Error: ${errorMessage}`);
		});

		expect(goto).not.toHaveBeenCalled();
	});

	it('disables submit button during submission', async () => {
		const formDataWithRequiredFields = {
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-01-01',
			primaryEmail: 'john@example.com',
			country: 'USA',
			city: '',
			postalCode: '',
			website: ''
		};

		let resolveOnboard: (value: { firstName: string; lastName: string }) => void;
		vi.mocked(onboard).mockImplementation(
			() =>
				new Promise((resolve) => {
					resolveOnboard = resolve;
				})
		);

		render(OnboardingForm, { formData: formDataWithRequiredFields });

		const submitButton = screen.getByRole('button', { name: /sign up/i });
		await user.click(submitButton);

		expect(submitButton).toBeDisabled();

		// Clean up by resolving the promise
		resolveOnboard!({ firstName: 'Test', lastName: 'User' });
	});

	it('handles cancel button click', async () => {
		render(OnboardingForm, { formData: mockFormData });

		const cancelButton = screen.getByRole('button', { name: /cancel/i });
		await user.click(cancelButton);

		expect(web3Auth.logout).toHaveBeenCalled();
		expect(removeSessionToken).toHaveBeenCalled();
		expect(removeRefreshToken).toHaveBeenCalled();
		expect(window.location.href).toBe('/');
	});

	it('has required attribute set on inputs appropriately', () => {
		render(OnboardingForm, { formData: mockFormData });

		// Check required fields have required attribute
		expect(screen.getByLabelText(/first name/i)).toHaveAttribute('required');
		expect(screen.getByLabelText(/last name/i)).toHaveAttribute('required');
		expect(screen.getByLabelText(/date of birth/i)).toHaveAttribute('required');
		expect(screen.getByLabelText(/email/i)).toHaveAttribute('required');

		// Check optional fields don't have required attribute
		expect(screen.getByLabelText(/country/i)).not.toHaveAttribute('required');
		expect(screen.getByLabelText(/city/i)).not.toHaveAttribute('required');
		expect(screen.getByLabelText(/postal code/i)).not.toHaveAttribute('required');
		expect(screen.getByLabelText(/website/i)).not.toHaveAttribute('required');
	});
});
