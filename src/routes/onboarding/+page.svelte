<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import OnboardingForm from '$lib/features/onboarding/OnboardingForm.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { firstName, lastName, user } = data;
</script>

<div>
	<Heading type="h1">Sign Up For Full Access</Heading>
	<OnboardingForm
		formData={{
			firstName,
			lastName,
			dateOfBirth: new Date().toISOString(),
			primaryEmail: user?.email ?? '',
			country: ''
		}}
	/>
</div>
