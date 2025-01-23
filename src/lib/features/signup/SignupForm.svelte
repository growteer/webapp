<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/input/input.svelte';
	import { signup } from '$lib/services/authn/mutations.gql';
	import { web3Auth } from '$lib/services/w3a/web3auth';
	import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
	import type { ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { type FormData } from './schema';
	import { getContext } from 'svelte';

	export const toast: ToastContext = getContext<ToastContext>('toast');

	interface Props {
		formData: FormData;
	}

	const { formData }: Props = $props();

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

		try {
			await signup({
				firstname: formData.firstName,
				lastname: formData.lastName,
				dateOfBirth: formData.dateOfBirth.toISOString(),
				primaryEmail: formData.primaryEmail,
				location: {
					country: formData.country,
					city: formData.city ?? undefined,
					postalCode: formData.postalCode ?? undefined
				},
				website: formData.website
			});

			goto('/');
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
		<Input label="Firs Name" type="text" value={formData.firstName} required />
		<Input label="Last Name" type="text" value={formData.lastName} required />
		<Input label="Date of Birth" type="date" value={formData.dateOfBirth.toISOString()} required />
		<Input label="Email" type="email" value={formData.primaryEmail} required />

		<!-- optional -->
		<Input label="Country" type="text" value={formData.country} />
		<Input label="Postal Code" type="text" value={formData.postalCode} />
		<Input label="City" type="text" value={formData.city} />
		<Input label="Website" type="text" value={formData.website} />
	</form>
	<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
		<button type="submit" form={formID} class="btn preset-filled-secondary-500 gap-2" disabled={submitting}>
			Sign up
		</button>
		<button type="button" class="btn preset-outlined-surface-500 gap-2" onclick={cancel}>Cancel</button>
	</footer>
</section>
