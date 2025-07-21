<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
	import { LogIn } from 'lucide-svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { goto } from '$app/navigation';
	import { toastError, toastSuccess } from '$lib/services/toast';

	const auth = new AuthClient();

	const handleLogin = async () => {
		try {
			const loggedIn = await auth.login();
			if (!loggedIn) return (window.location.href = '/onboarding');
		} catch (err) {
			toastError(String(err));

			return goto('/');
		}

		toastSuccess('Successfully logged in');

		window.location.href = '/';
	};
</script>

<Navigation.Tile id="btn-login" labelExpanded="Login" title="login" onclick={handleLogin}><LogIn /></Navigation.Tile>
