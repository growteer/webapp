<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input/input.svelte';
	import { signup } from '$lib/services/authn/mutations.gql';
	import { web3Auth } from '$lib/services/w3a/web3auth';
	import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
	import type { ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { type FormData } from './schema';
	import { getContext } from 'svelte';
	import type { SignupInput } from '$lib/api/generated/types';

	export const toast: ToastContext = getContext<ToastContext>('toast');

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

		const { firstname, lastname, dateOfBirth, primaryEmail, country, city, postalCode, website } = formData;

		const profile: SignupInput = {
			firstname,
			lastname,
			dateOfBirth,
			primaryEmail,
			country
		};

		if (city) profile.city = city;
		if (postalCode) profile.postalCode = postalCode;
		if (website) profile.website = website;

		try {
			await signup(profile);

			return goto('/');
		} catch (err) {
			submitting = false;
			toast.create({
				description: String(err),
				type: 'error'
			});
		}
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={submit} class=" space-y-4">
		<!-- mandatory-->
		<Input label="Firs Name" type="text" bind:value={formData.firstname} required />
		<Input label="Last Name" type="text" bind:value={formData.lastname} required />
		<Input label="Date of Birth" type="date" bind:value={formData.dateOfBirth} required />
		<Input label="Email" type="email" bind:value={formData.primaryEmail} required />

		<!-- optional -->
		<Input label="Country" type="text" bind:value={formData.country} />
		<Input label="Postal Code" type="text" bind:value={formData.postalCode} />
		<Input label="City" type="text" bind:value={formData.city} />
		<Input label="Website" type="text" bind:value={formData.website} />
	</form>
	<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
		<button type="submit" form={formID} class="btn gap-2 preset-filled-secondary-500" disabled={submitting}>
			Sign up
		</button>
		<button type="button" class="btn gap-2 preset-outlined-surface-500" onclick={cancel}>Cancel</button>
	</footer>
</section>
