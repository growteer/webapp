<script lang="ts">
	import { Heading } from '$lib/components/atoms';
	import { ProfileForm } from '$lib/components/organisms';
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
		profileData={{
			firstName: profile.firstName,
			lastName: profile.lastName,
			dateOfBirth: profile.dateOfBirth,
			primaryEmail: profile.primaryEmail,
			location: {
				country: profile.location.country,
				postalCode: profile.location.postalCode ?? '',
				city: profile.location.city ?? ''
			},
			website: profile.website ?? '',
			personalGoal: profile.personalGoal ?? '',
			about: profile.about ?? ''
		}}
	/>
</div>
