<script lang="ts">
	import Input from '$lib/components/input/input.svelte';
	import type { ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { type FormData } from './schema';
	import { getContext } from 'svelte';
	import type { UserProfile } from '$lib/api/generated/types';

	export const toast: ToastContext = getContext<ToastContext>('toast');

	interface Props {
		formData: FormData;
	}

	let { formData = $bindable() }: Props = $props();

	const formID = 'form-profile';
	let submitting = $state(false);
	let unsavedData = $state(false);

	async function save() {
		submitting = true;

		const { firstname, lastname, dateOfBirth, primaryEmail, country, city, postalCode, website, personalGoal, about } =
			formData;

		const profile: UserProfile = {
			firstname,
			lastname,
			dateOfBirth: new Date(dateOfBirth).toISOString(),
			primaryEmail,
			location: {
				country
			},
			website,
			personalGoal,
			about
		};

		if (city) profile.location.city = city;
		if (postalCode) profile.location.postalCode = postalCode;
		if (website) profile.website = website;
		if (personalGoal) profile.personalGoal = personalGoal;
		if (about) profile.about = about;

		try {
			//await updateProfile(profile);
			unsavedData = false;
		} catch (err) {
			toast.create({
				description: String(err),
				type: 'error'
			});
		}

		submitting = false;
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={save} onchange={() => (unsavedData = true)} class="space-y-4">
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

		<Input label="Personal Goal" type="text" bind:value={formData.personalGoal} />
		<Input label="About Me" type="textarea" bind:value={formData.about} />
	</form>
	<footer class="my-8 grid grid-cols-2 place-content-center gap-4">
		<button
			type="submit"
			form={formID}
			class="btn gap-2 preset-filled-secondary-500"
			disabled={submitting || !unsavedData}
		>
			Save
		</button>
	</footer>
</section>
