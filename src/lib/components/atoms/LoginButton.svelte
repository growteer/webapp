<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
	import { goto } from '$app/navigation';
	import { toastError, toastSuccess } from '$lib/services/toast';
	import { initWeb3Auth } from '$lib/services/w3a/web3auth';

	const auth = new AuthClient();

	const handleLogin = async () => {
		try {
			await initWeb3Auth();
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

<button
	type="button"
	id="btn-login"
	onclick={handleLogin}
	class="btn preset-filled-primary-500 btn-lg">Login</button
>
