<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	import { toUpdatedProfile } from './schema';
	import { updateUserProfile } from './mutation.gql';
	import { toastError, toastSuccess } from '$lib/services/toast';
	import type { Profile } from '$lib/api/generated/types';

	interface Props {
		profileData: Profile;
	}

	let { profileData = $bindable() }: Props = $props();

	const formID = 'form-profile';
	let submitting = $state(false);
	let unsavedData = $state(false);

	async function save() {
		submitting = true;

		const updatedProfile = toUpdatedProfile(profileData);

		try {
			await updateUserProfile(updatedProfile);
			unsavedData = false;
		} catch (err) {
			toastError(String(err));
		}

		toastSuccess('Profile updated successfully');

		submitting = false;
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={save} onchange={() => (unsavedData = true)} class="space-y-4">
		<!-- mandatory-->
		<Input label="First Name" type="text" bind:value={profileData.firstName} required />
		<Input label="Last Name" type="text" bind:value={profileData.lastName} required />
		<Input label="Date of Birth" type="date" bind:value={profileData.dateOfBirth} required />
		<Input label="Email" type="email" bind:value={profileData.primaryEmail} required />

		<!-- optional -->
		<Input label="Country" type="text" bind:value={profileData.location.country} />
		<Input label="Postal Code" type="text" bind:value={profileData.location.postalCode} />
		<Input label="City" type="text" bind:value={profileData.location.city} />
		<Input label="Website" type="text" bind:value={profileData.website} />

		<Input label="Personal Goal" type="text" bind:value={profileData.personalGoal} />
		<Input label="About Me" type="textarea" bind:value={profileData.about} />
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
