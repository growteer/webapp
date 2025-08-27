<script lang="ts">
	import { AuthClient } from '$lib/services/authn/client';
	import { goto } from '$app/navigation';
	import { toastError, toastSuccess } from '$lib/services/toast';
	import { _ } from '$lib/services/i18n';

	const auth = new AuthClient();

	const handleLogin = async () => {
		try {
			const loggedIn = await auth.login();
			if (!loggedIn) return goto('/onboarding');
		} catch (err) {
			toastError(String(err));

			return goto('/');
		}

		toastSuccess($_('auth.signInSuccess'));

		return goto('/profile');
	};
</script>

<button type="button" id="btn-login" onclick={handleLogin} class="btn preset-filled-primary-500 btn-lg">
	{$_('common.signIn')}
</button>
