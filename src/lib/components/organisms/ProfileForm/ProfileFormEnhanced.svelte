<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	import ErrorBoundary from '$lib/components/error/ErrorBoundary.svelte';
	import { toUpdatedProfile } from './schema';
	import { updateUserProfile } from './mutation.gql';
	import { toastSuccess } from '$lib/services/toast';
	import type { Profile } from '$lib/api/generated/types';
	import { _ } from '$lib/services/i18n';
	import { errorService, type AppError, ErrorType, ErrorSeverity } from '$lib/services/error';
	import { withErrorHandling, createValidationError, handleFormError } from '$lib/utils/error-handling';

	interface Props {
		profileData: Profile;
	}

	let { profileData = $bindable() }: Props = $props();

	const formID = 'form-profile';
	let submitting = $state(false);
	let unsavedData = $state(false);
	let formError = $state<AppError | undefined>();

	// Validation function with error handling
	function validateForm(): AppError | null {
		// Reset form error
		formError = undefined;

		// Required field validation
		if (!profileData.firstName?.trim()) {
			return createValidationError('firstName', 'required', $_('validation.required'));
		}

		if (!profileData.lastName?.trim()) {
			return createValidationError('lastName', 'required', $_('validation.required'));
		}

		if (!profileData.dateOfBirth) {
			return createValidationError('dateOfBirth', 'required', $_('validation.required'));
		}

		if (!profileData.primaryEmail?.trim()) {
			return createValidationError('primaryEmail', 'required', $_('validation.required'));
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (profileData.primaryEmail && !emailRegex.test(profileData.primaryEmail)) {
			return createValidationError('primaryEmail', 'invalid', $_('validation.invalidEmail'));
		}

		return null;
	}

	async function save(event: SubmitEvent) {
		event.preventDefault();

		// Validate form
		const validationError = validateForm();
		if (validationError) {
			formError = validationError;
			errorService.handle(validationError);
			return;
		}

		submitting = true;
		formError = undefined;

		try {
			const updatedProfile = toUpdatedProfile(profileData);

			const result = await withErrorHandling(
				async () => {
					return await updateUserProfile(updatedProfile);
				},
				{
					source: 'ProfileForm',
					operation: 'save',
					onError: (error) => {
						formError = error;
					}
				}
			);

			if (result) {
				unsavedData = false;
				toastSuccess($_('profile.updateSuccess'));
			}
		} catch (error) {
			// Fallback error handling for unexpected errors
			formError = handleFormError(error, 'ProfileForm');
		} finally {
			submitting = false;
		}
	}

	// Clear error when user starts typing
	function clearFormError() {
		if (formError) {
			formError = undefined;
		}
		unsavedData = true;
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<ErrorBoundary error={formError} showRecoveryActions={false} on:retry={() => (formError = undefined)}>
		<form id={formID} onsubmit={save} onchange={clearFormError} class="space-y-4">
			<!-- mandatory-->
			<Input
				label={$_('profile.fields.firstName')}
				type="text"
				bind:value={profileData.firstName}
				required
				error={formError?.context?.metadata?.field === 'firstName' ? formError.message : undefined}
			/>
			<Input
				label={$_('profile.fields.lastName')}
				type="text"
				bind:value={profileData.lastName}
				required
				error={formError?.context?.metadata?.field === 'lastName' ? formError.message : undefined}
			/>
			<Input
				label={$_('profile.fields.dateOfBirth')}
				type="date"
				bind:value={profileData.dateOfBirth}
				required
				error={formError?.context?.metadata?.field === 'dateOfBirth' ? formError.message : undefined}
			/>
			<Input
				label={$_('profile.fields.email')}
				type="email"
				bind:value={profileData.primaryEmail}
				required
				error={formError?.context?.metadata?.field === 'primaryEmail' ? formError.message : undefined}
			/>

			<!-- optional -->
			<Input label={$_('profile.fields.country')} type="text" bind:value={profileData.location.country} />
			<Input label={$_('profile.fields.postalCode')} type="text" bind:value={profileData.location.postalCode} />
			<Input label={$_('profile.fields.city')} type="text" bind:value={profileData.location.city} />
			<Input label={$_('profile.fields.website')} type="text" bind:value={profileData.website} />
			<Input label={$_('profile.fields.personalGoal')} type="text" bind:value={profileData.personalGoal} />
			<Input label={$_('profile.fields.about')} type="textarea" bind:value={profileData.about} />
		</form>

		<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
			<button
				type="submit"
				form={formID}
				class="btn gap-2 preset-filled-secondary-500"
				disabled={submitting || !unsavedData}
			>
				{#if submitting}
					{$_('common.loading')}
				{:else}
					{$_('common.save')}
				{/if}
			</button>
		</footer>
	</ErrorBoundary>
</section>
