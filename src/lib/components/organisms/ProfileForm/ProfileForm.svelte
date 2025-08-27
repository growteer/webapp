<script lang="ts">
	import Input from '$lib/components/atoms/Input.svelte';
	import { toUpdatedProfile } from './schema';
	import { updateUserProfile } from './mutation.gql';
	import { toastError, toastSuccess } from '$lib/services/toast';
	import type { Profile } from '$lib/api/generated/types';
	import { _ } from '$lib/services/i18n';

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

		toastSuccess($_('profile.updateSuccess'));

		submitting = false;
	}
</script>

<section class="mx-auto grid w-full max-w-md grid-cols-1">
	<form id={formID} onsubmit={save} onchange={() => (unsavedData = true)} class="space-y-4">
		<!-- mandatory-->
		<Input label={$_('profile.fields.firstName')} type="text" bind:value={profileData.firstName} required />
		<Input label={$_('profile.fields.lastName')} type="text" bind:value={profileData.lastName} required />
		<Input label={$_('profile.fields.dateOfBirth')} type="date" bind:value={profileData.dateOfBirth} required />
		<Input label={$_('profile.fields.email')} type="email" bind:value={profileData.primaryEmail} required />

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
			{$_('common.save')}
		</button>
	</footer>
</section>
