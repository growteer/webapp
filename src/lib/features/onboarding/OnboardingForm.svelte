<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input/input.svelte';
	import { onboard } from '$lib/services/authn/mutations.gql';
	import { web3Auth } from '$lib/services/w3a/web3auth';
	import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
	import { type FormData } from './schema';
	import type { NewProfile } from '$lib/api/generated/types';
	import { toastError } from '$lib/features/toast';

	interface Props {
		formData: FormData;
	}

	let { formData = $bindable() }: Props = $props();

	const formID = 'form-signup';
	let submitting = $state(false);

	async function cancel() {
		submitting = true;

		web3Auth?.logout();
		removeSessionToken();
		removeRefreshToken();

		window.location.href = '/';
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

			return goto('/');
		} catch (err) {
			submitting = false;
			toastError(String(err));
		}
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={submit} class=" space-y-4">
		<!-- mandatory-->
		<Input label="First Name" type="text" bind:value={formData.firstName} required />
		<Input label="Last Name" type="text" bind:value={formData.lastName} required />
		<Input label="Date of Birth" type="date" bind:value={formData.dateOfBirth} required />
		<Input label="Email" type="email" bind:value={formData.primaryEmail} required />

		<!-- optional -->
		<Input label="Country" type="text" bind:value={formData.country} />
		<Input label="Postal Code" type="text" bind:value={formData.postalCode} />
		<Input label="City" type="text" bind:value={formData.city} />
		<Input label="Website" type="text" bind:value={formData.website} />
	</form>
	<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
		<button type="submit" form={formID} class="btn preset-filled-secondary-500 gap-2" disabled={submitting}>
			Sign up
		</button>
		<button type="button" class="btn preset-outlined-surface-500 gap-2" onclick={cancel}>Cancel</button>
	</footer>
</section>
