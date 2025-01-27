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
	let { firstname, lastname } = $derived.by(() => {
		const nameParts = data.user.name?.split(' ');
		if (!nameParts) return { firstname: '', lastname: '' };

		const lastname = nameParts.pop() ?? '';
		const firstname = nameParts.join(' ') ?? '';

		return { firstname, lastname };
	});

	onMount(() => {
		if (!getIsAuthenticatedContext()) goto('/');
	});
</script>

<div>
	<Heading type="h1">Sign Up For Full Access</Heading>
	<ProfileForm
		formData={{
			firstname,
			lastname,
			dateOfBirth: new Date().toISOString(),
			primaryEmail: data.user.email ?? '',
			country: ''
		}}
	/>
</div>
