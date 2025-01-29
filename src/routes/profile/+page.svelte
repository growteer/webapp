<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import ProfileForm from '$lib/features/profile/ProfileForm.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { profile } = data;
</script>

<div>
	<Heading type="h1">Update Your Profile</Heading>
	<ProfileForm
		formData={{
			firstname: profile.firstname,
			lastname: profile.lastname,
			dateOfBirth: profile.dateOfBirth,
			primaryEmail: profile.primaryEmail,
			country: profile.location.country,
			postalCode: profile.location.postalCode ?? '',
			city: profile.location.city ?? '',
			website: profile.website ?? '',
			personalGoal: profile.personalGoal ?? '',
			about: profile.about ?? ''
		}}
	/>
</div>
