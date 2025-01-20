<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data }: Props = $props();
	const { isAuthenticated, user } = data;
</script>

<div>
	<Heading type="h1">Welcome to Growteer!</Heading>
	{#if isAuthenticated}
		<p>Hello, {user.name}</p>
	{/if}
</div>
