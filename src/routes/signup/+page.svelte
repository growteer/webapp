<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import ProfileForm from '$lib/features/signup/SignupForm.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { getIsAuthenticatedContext } from '$lib/contexts';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { firstName, lastName } = $derived.by(() => {
		const nameParts = data.user.name?.split(' ');
		if (!nameParts) return { firstName: '', lastName: '' };

		const lastName = nameParts.pop();
		const firstName = nameParts.join(' ');

		return { firstName, lastName };
	});

	onMount(() => {
		if (!getIsAuthenticatedContext()) goto('/');
	});
</script>

<div>
	<Heading type="h1">Sign Up For Full Access</Heading>
	<ProfileForm
		formData={{
			firstName: firstName ?? '',
			lastName: lastName ?? '',
			dateOfBirth: new Date(),
			primaryEmail: data.user.email ?? '',
			country: ''
		}}
	/>
</div>
