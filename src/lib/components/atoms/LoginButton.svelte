<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
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

<button type="button" id="btn-login" onclick={handleLogin} class="btn btn-lg preset-filled-primary-500">Login</button>
