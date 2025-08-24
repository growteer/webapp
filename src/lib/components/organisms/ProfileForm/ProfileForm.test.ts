import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ProfileForm from './ProfileForm.svelte';
import type { Profile } from '$lib/api/generated/types';
import userEvent from '@testing-library/user-event';

describe('ProfileForm', () => {
	const minimalProfile: Profile = {
		firstName: 'John',
		lastName: 'Doe',
		dateOfBirth: '1990-01-01',
		primaryEmail: 'test@example.com',
		location: {
			country: 'USA'
		}
	};

	it('form renders all fields', () => {
		const testProfile: Profile = {
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

		render(ProfileForm, { profileData: testProfile });

		expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
		expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
		expect(screen.getByLabelText(/date of birth/i)).toHaveValue('1990-01-01');
		expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
		expect(screen.getByLabelText(/country/i)).toHaveValue('USA');
		expect(screen.getByLabelText(/city/i)).toHaveValue('New York');
		expect(screen.getByLabelText(/postal code/i)).toHaveValue('10001');
		expect(screen.getByLabelText(/website/i)).toHaveValue('https://example.com');
		expect(screen.getByLabelText(/personal goal/i)).toHaveValue('Learn Svelte');
		expect(screen.getByLabelText(/about/i)).toHaveValue('Software developer');
	});

	it('form renders with empty fields', () => {
		const testProfile: Profile = {
			...minimalProfile,
			location: {
				country: 'USA',
				city: ''
			}
		};

		render(ProfileForm, { profileData: testProfile });

		expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
		expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
		expect(screen.getByLabelText(/date of birth/i)).toHaveValue('1990-01-01');
		expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
		expect(screen.getByLabelText(/country/i)).toHaveValue('USA');
		expect(screen.getByLabelText(/city/i)).toHaveValue('');
		expect(screen.getByLabelText(/postal code/i)).toHaveValue('');
		expect(screen.getByLabelText(/website/i)).toHaveValue('');
		expect(screen.getByLabelText(/personal goal/i)).toHaveValue('');
		expect(screen.getByLabelText(/about/i)).toHaveValue('');
	});

	it('save button is enabled when there is a change, disabled when submitting', async () => {
		const user = userEvent.setup();
		render(ProfileForm, { profileData: minimalProfile });

		const saveButton = screen.getByRole('button', { name: /save/i });
		expect(saveButton).toBeDisabled();

		const firstNameInput = screen.getByLabelText(/first name/i);
		await user.clear(firstNameInput);
		await user.type(firstNameInput, 'delayed');
		await user.tab();

		expect(saveButton).toBeEnabled();
		await user.click(saveButton);

		expect(saveButton).toBeDisabled();
	});
});
