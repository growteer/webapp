<script>
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import { removeRefreshToken, removeSessionToken } from '$lib/storage/local';
	import { GradientButton } from 'flowbite-svelte';

	const handleLogout = async () => {
		const web3auth = await initWeb3Auth();
		await web3auth.logout();

		removeSessionToken();
		removeRefreshToken();
		window.location.href = '/';
	};
</script>

<GradientButton size="sm" outline color="lime" onclick={handleLogout}>Logout</GradientButton>
