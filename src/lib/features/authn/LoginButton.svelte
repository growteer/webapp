<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
	import { LogIn } from 'lucide-svelte';
	import { Navigation, type ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	export const toast: ToastContext = getContext<ToastContext>('toast');
	const auth = new AuthClient();

	const handleLogin = async () => {
		try {
			const loggedIn = await auth.login();
			if (!loggedIn) return (window.location.href = '/signup');
		} catch (err) {
			toast.create({
				description: String(err),
				type: 'error'
			});

			return goto('/');
		}

		toast.create({
			description: 'Successfully logged in',
			type: 'success'
		});

		window.location.href = '/';
	};
</script>

<Navigation.Tile id="btn-login" labelExpanded="Login" title="login" onclick={handleLogin}><LogIn /></Navigation.Tile>
