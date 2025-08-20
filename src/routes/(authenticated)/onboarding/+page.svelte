<script lang="ts">
	import { Heading } from '$lib/components/atoms';
	import { OnboardingForm } from '$lib/components/organisms';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { email } = data;
</script>

<div>
	<Heading type="h1">Create Your Profile For Full Access</Heading>
	<OnboardingForm
		formData={{
			firstName: '',
			lastName: '',
			dateOfBirth: new Date().toISOString(),
			primaryEmail: email,
			country: ''
		}}
	/>
</div>
