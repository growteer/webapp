<script lang="ts">
	import Input from '$lib/components/input/input.svelte';
	import { createToaster } from '@skeletonlabs/skeleton-svelte';
	import { toUpdatedProfile, type FormData } from './schema';
	import { updateUserProfile } from './mutation.gql';

	export const toaster = createToaster();

	interface Props {
		formData: FormData;
	}

	let { formData = $bindable() }: Props = $props();

	const formID = 'form-profile';
	let submitting = $state(false);
	let unsavedData = $state(false);

	async function save() {
		submitting = true;

		const profile = toUpdatedProfile(formData);

		try {
			await updateUserProfile(profile);
			unsavedData = false;
		} catch (err) {
			toaster.error({ description: String(err) });
		}

		toaster.success({ description: 'Profile updated successfully' });

		submitting = false;
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={save} onchange={() => (unsavedData = true)} class="space-y-4">
		<!-- mandatory-->
		<Input label="Firs Name" type="text" bind:value={formData.firstName} required />
		<Input label="Last Name" type="text" bind:value={formData.lastName} required />
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
			class="btn preset-filled-secondary-500 gap-2"
			disabled={submitting || !unsavedData}
		>
			Save
		</button>
	</footer>
</section>
