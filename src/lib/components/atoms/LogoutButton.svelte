<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthClient } from '$lib/services/authn/client';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { LogOut } from 'lucide-svelte';

	const handleLogout = async () => {
		const auth = new AuthClient();
		await auth.logout();

		goto('/');
	};
</script>

<Navigation.Tile
	id="btn-signout"
	expandedPadding="py-2 px-2"
	labelExpanded="Sign out"
	title="signout"
	classes="text-error-500"
	expandedClasses="text-error-600-400"
	onclick={handleLogout}
>
	<LogOut />
</Navigation.Tile>
