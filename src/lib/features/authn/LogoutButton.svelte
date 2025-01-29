<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { LogOut } from 'lucide-svelte';

	const handleLogout = async () => {
		const auth = new AuthClient();
		await auth.logout();

		window.location.href = '/';
	};
</script>

<Navigation.Tile id="btn-logout" labelExpanded="Logout" title="logout" onclick={handleLogout}
	><LogOut /></Navigation.Tile
>
