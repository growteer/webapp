<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data }: Props = $props();
	const { isAuthenticated, user } = data;
</script>

<div class="p-4">
	<h1 class="h1">Welcome to Growteer!</h1>
	{#if isAuthenticated}
		<p>Hello, {user.name}</p>
	{/if}
</div>
