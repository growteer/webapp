<script>
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Menu, House } from 'lucide-svelte';
	import { LoginButton, LogoutButton } from '$lib/features/authn';
	import { getIsAuthenticatedContext } from '$lib/contexts';
</script>

<Navigation.Rail background="bg-primary-100">
	{#snippet header()}
		<Navigation.Tile href="/" title="Menu"><Menu /></Navigation.Tile>
	{/snippet}
	{#snippet tiles()}
		<Navigation.Tile id="0" label="Home" href="/">
			<House />
		</Navigation.Tile>
	{/snippet}
	{#snippet footer()}
		{#if getIsAuthenticatedContext()}
			<LogoutButton />
		{:else}
			<LoginButton />
		{/if}
	{/snippet}
</Navigation.Rail>
