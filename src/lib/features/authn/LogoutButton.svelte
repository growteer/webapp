<script>
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { LogOut } from 'lucide-svelte';

	const handleLogout = async () => {
		const web3auth = await initWeb3Auth();
		await web3auth.logout();

		removeSessionToken();
		removeRefreshToken();
		window.location.href = '/';
	};
</script>

<Navigation.Tile id="btn-logout" labelExpanded="Logout" title="logout" onclick={handleLogout}
	><LogOut /></Navigation.Tile
>
