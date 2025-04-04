<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Menu, House, UserRoundPen } from 'lucide-svelte';
	import { LoginButton, LogoutButton } from '$lib/features/authn';
	import { getIsAuthenticatedContext } from '$lib/contexts';
</script>

<Navigation.Rail background="bg-surface-300">
	{#snippet header()}
		<Navigation.Tile href="/" title="Menu"><Menu /></Navigation.Tile>
	{/snippet}
	{#snippet tiles()}
		<Navigation.Tile id="0" label="Home" href="/">
			<House />
		</Navigation.Tile>
		{#if getIsAuthenticatedContext()}
			<Navigation.Tile id="1" label="Profile" href="/profile">
				<UserRoundPen />
			</Navigation.Tile>
		{/if}
	{/snippet}
	{#snippet footer()}
		{#if getIsAuthenticatedContext()}
			<LogoutButton />
		{:else}
			<LoginButton />
		{/if}
	{/snippet}
</Navigation.Rail>
