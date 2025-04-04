<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { user } = data;
</script>

<div>
	<Heading type="h1">Welcome to Growteer!</Heading>
	{#if user}
		<p>Hello, {user.name}</p>
	{/if}
</div>
