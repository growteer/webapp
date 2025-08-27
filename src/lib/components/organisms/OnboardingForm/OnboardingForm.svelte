<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/atoms/Input.svelte';
	import { onboard } from '$lib/services/authn/mutations.gql';
	import { type FormData } from './schema';
	import type { NewProfile } from '$lib/api/generated/types';
	import { toastError } from '$lib/services/toast';
	import { AuthClient } from '$lib/services/authn/client';
	import { _ } from '$lib/services/i18n';

	interface Props {
		formData: FormData;
	}

	let { formData = $bindable() }: Props = $props();

	const formID = 'form-signup';
	let submitting = $state(false);

	async function cancel() {
		submitting = true;

		const auth = new AuthClient();
		await auth.logout();

		return goto('/');
	}

	async function submit() {
		submitting = true;

		const { firstName, lastName, dateOfBirth, primaryEmail, country, city, postalCode, website } = formData;

		const profile: NewProfile = {
			firstName,
			lastName,
			dateOfBirth,
			primaryEmail,
			country
		};

		if (city) profile.city = city;
		if (postalCode) profile.postalCode = postalCode;
		if (website) profile.website = website;

		try {
			await onboard(profile);

			return goto('/profile');
		} catch (err) {
			submitting = false;
			toastError(String(err));
		}
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={submit} class=" space-y-4">
		<!-- mandatory-->
		<Input label={$_('profile.fields.firstName')} type="text" bind:value={formData.firstName} required />
		<Input label={$_('profile.fields.lastName')} type="text" bind:value={formData.lastName} required />
		<Input label={$_('profile.fields.dateOfBirth')} type="date" bind:value={formData.dateOfBirth} required />
		<Input label={$_('profile.fields.email')} type="email" bind:value={formData.primaryEmail} required />

		<!-- optional -->
		<Input label={$_('profile.fields.country')} type="text" bind:value={formData.country} />
		<Input label={$_('profile.fields.postalCode')} type="text" bind:value={formData.postalCode} />
		<Input label={$_('profile.fields.city')} type="text" bind:value={formData.city} />
		<Input label={$_('profile.fields.website')} type="text" bind:value={formData.website} />
	</form>
	<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
		<button type="submit" form={formID} class="btn gap-2 preset-filled-secondary-500" disabled={submitting}>
			{$_('onboarding.createProfile')}
		</button>
		<button type="button" class="btn gap-2 preset-outlined-surface-500" onclick={cancel}>{$_('common.cancel')}</button>
	</footer>
</section>
