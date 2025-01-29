<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import ProfileForm from '$lib/features/signup/SignupForm.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { firstname, lastname, user } = data;
</script>

<div>
	<Heading type="h1">Sign Up For Full Access</Heading>
	<ProfileForm
		formData={{
			firstname,
			lastname,
			dateOfBirth: new Date().toISOString(),
			primaryEmail: user?.email ?? '',
			country: ''
		}}
	/>
</div>
